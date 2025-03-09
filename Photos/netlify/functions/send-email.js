
const fetch = require('node-fetch');
require('dotenv').config();

exports.handler = async (event, context) => {
    // Check for POST method
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Only POST requests are allowed' }),
        };
    }

    const { name, email, message, captchaResponse } = JSON.parse(event.body);

    if (!name || !email || !message || !captchaResponse) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'All fields and reCAPTCHA are required' }),
        };
    }

    //Verify reCAPTCHA 
    const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaResponse}`;

    try {
        const recaptchaResponse = await fetch(recaptchaVerifyUrl, { method: 'POST' });
        const recaptchaResult = await recaptchaResponse.json();

        if (!recaptchaResult.success) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'reCAPTCHA verification failed' }),
            };
        }

        // Forward the data to your email API
        const apiUrl = process.env.API_URL; 

        const response = await fetch(`${apiUrl}/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message, captchaResponse }),
        });

        if (response.ok) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Email sent successfully!' }),
            };
        } else {
            const errorData = await response.json();
            return {
                statusCode: 500,
                body: JSON.stringify({ message: errorData.message || 'Failed to send email' }),
            };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to process the request' }),
        };
    }
};
