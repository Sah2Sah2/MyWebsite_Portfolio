require('dotenv').config();

exports.handler = async (event, context) => {
    const { default: fetch } = await import('node-fetch');

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Only POST requests are allowed' }),
        };
    }

    const { name, email, message, captchaResponse } = JSON.parse(event.body);

    console.log("Received data:", { name, email, message, captchaResponse }); // Debugging log

    if (!name || !email || !message || !captchaResponse) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'All fields and reCAPTCHA are required' }),
        };
    }

    // Verify reCAPTCHA
    const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaResponse}`;

    try {
        console.log('Verifying reCAPTCHA with URL:', recaptchaVerifyUrl);

        const recaptchaResponse = await fetch(recaptchaVerifyUrl, { method: 'POST' });
        const recaptchaResult = await recaptchaResponse.json();

        console.log('reCAPTCHA verification result:', recaptchaResult);

        if (!recaptchaResult.success) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'reCAPTCHA verification failed' }),
            };
        }

        // Forward the data to your email API
        const apiUrl = process.env.API_URL;

        if (!apiUrl) {
            console.error('API_URL is not defined in environment variables!');
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'API_URL is not defined in environment variables' }),
            };
        }

        console.log('Sending email data to API URL:', apiUrl);

        const response = await fetch(`${apiUrl}/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message, captchaResponse }),
        });

        const responseBody = await response.text();
        console.log('Email API response body:', responseBody);

        let errorData = {};
        try {
            errorData = JSON.parse(responseBody);
        } catch (error) {
            console.error('Error parsing response body:', error);
            errorData = { message: 'Unknown error' };
        }

        return {
            statusCode: response.ok ? 200 : 500,
            body: JSON.stringify({ message: errorData.message || 'Failed to send email' }),
        };
    } catch (error) {
        console.error('Error in handler:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to process the request' }),
        };
    }
};
