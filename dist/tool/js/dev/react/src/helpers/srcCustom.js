function srcCustom(url) {
    const dev = NODE_ENV === 'development';
    let fullUrl = dev ? 'http://localhost': '';
    return fullUrl+url;
}
export default srcCustom;

