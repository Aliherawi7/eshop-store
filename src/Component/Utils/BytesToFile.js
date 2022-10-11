export function BytesToFile(data, type) {
    let binaryString = window.atob(data);
    let binaryLength = binaryString.length;
    let bytes = new Uint8Array(binaryLength);
    for (let i = 0; i < binaryLength; i++) {
        let ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    let blob = new Blob([bytes], { type: type });
    return window.URL.createObjectURL(blob);
}

export function getBlobOfFile(data, type){
    let binaryString = window.atob(data);
    let binaryLength = binaryString.length;
    let bytes = new Uint8Array(binaryLength);
    for (let i = 0; i < binaryLength; i++) {
        let ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return new Blob([bytes], { type: type });
}
 