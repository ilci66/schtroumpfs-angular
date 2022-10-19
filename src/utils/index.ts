const idToken = sessionStorage.getItem("id_token");
const expiresAt:string = sessionStorage.getItem("expires_at"); 

export const checkToken = () => {
    if(idToken && parseInt(expiresAt) >= Date.now()) false;
    return true;
}