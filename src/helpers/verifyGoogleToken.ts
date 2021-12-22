import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (token: string): Promise<{
    name: string,
    email: string,
    picture: string,
}> => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (
        payload &&
        payload !== undefined
    ) {
        const { name, picture, email } = payload;

        return {
            name: name || '',
            email: email || '',
            picture: picture || '',
        }
    } else {
        throw new Error('Error to get payload')
    }

}


export { verifyGoogleToken };