export const extractDate = (payload) => {
    if(!payload)   return ""
    return new Date(payload).toLocaleString('en-IN').split(',')[0];
}

export const postDate = (payload) => {
    if(!payload)   return ""
    return new Date(payload).toLocaleString('en-US').split(',')[0];
}