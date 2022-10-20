const idToken = sessionStorage.getItem("id_token");
const expiresAt:string = sessionStorage.getItem("expires_at"); 

export const checkToken = () => {
    if(idToken && parseInt(expiresAt) >= Date.now()) false;
    return true;
}

export const saveUserSession = (expiresIn:string, token: string) => {
    sessionStorage.removeItem("id_token");
    sessionStorage.removeItem("expires_at");
    const expiresAt = Date.now() + Number.parseInt(expiresIn) * 86400 * 1000; // day

    sessionStorage.setItem('id_token', token);
    sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    return;
}