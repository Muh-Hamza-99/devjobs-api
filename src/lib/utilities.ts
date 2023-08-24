export function isObjectEmpty(body: any): boolean {
    return Object.keys(body).length === 0;
};

export function generateVerificationToken(): number {
    return Math.floor(Math.random() * 1000000000);
};

export function cleanResponse<T>(object: T) {
    const properties = ["password", "token"];
    for (const property of properties) {
        if (object.hasOwnProperty(property)) {
            delete object[property];
        };
    };
    return object;
};