declare global {
    interface Window {
        sessionjs: any;
        Raven: any;
    }
}


export interface IHeaderParamOption {
    key: string;
    value: string;
}

function errorHandler(response) {
    return response.text().then(body => {
        if (body == null || body === '') {
            const error = new Error(body);
            Object.assign(error, { status: response.status }, { statusText: response.statusText });
            throw error;
        }
        let parsedError;
        try {
            parsedError = JSON.parse(body);
        } catch (e) { }
        if (parsedError) {
            const error = new Error((parsedError && parsedError.message) || body);
            Object.assign(error, parsedError, { isHydraError: true }, { status: response.status }, { statusText: response.statusText });
            throw error;
        } else {
            const error = new Error(body);
            Object.assign(error, { status: response.status }, { statusText: response.statusText });
            throw error;
        }
    });
}

function responseHandler<T>(response, dataType?: string): T {
    if (response.status === 204) {
        return null;
    } else if (response.status === 200 || response.status === 201) {
        return response.clone().text().then((body) => {
            if (body == null || body === '') return null;
            if (dataType === 'text') return body;
            // Safari must implement the fetch API differently than Chrome/FF as Safari doesn't like the response to
            // ever be cloned.  Therefore, if the clone fails here, we can just return the response.json()
            try {
                return response.clone().json().catch((e) => {
                    // The only possible error here is either response is null or parsing json fails.  Both of which
                    // we just want to return the response, which would either be null or the actual api error
                    return errorHandler(response);
                });
            } catch (e) {
                return response.json().catch((e) => {
                    // The only possible error here is either response is null or parsing json fails.  Both of which
                    // we just want to return the response, which would either be null or the actual api error
                    return errorHandler(response);
                });
            }
        });
    } else {
        return errorHandler(response);
    }
}

interface IError {
    message: string;
    stack?: string;
    extra?: {
        url: string;
        params: object;
    };
}


function isError(error: IError): error is IError {
    return error && (error as Error).message != null;
}

function processCaughtError(uri, params, error: IError) {
    try {
        if (isError(error)) {
            error.extra = {
                url: uri.toString(),
                params
            };
        }
    } catch (e) { }
}

function callFetchAndHandleJwt<T>(uri, params, dataType?: string, externalUrl?: boolean): Promise<T> {
    return new Promise((resolve, reject) => {
        fetch(uri.toString(), params)
            .then((response) => responseHandler(response, dataType))
            .then(output => resolve(output))
            .catch((error: IError) => {
                processCaughtError(uri, params, error);
                reject(error);
            })
    });
}

export function getUri<T>(uri, headerParams?: IHeaderParamOption[], dataType?: string, externalUrl?: boolean): Promise<T> {
    const params = {
        method: 'GET',
        headers: {'Access-Control-Allow-Origin': '*'}
    };
    if (headerParams !== undefined) {
        headerParams.forEach((element) => {
            params.headers[element.key] = element.value;
        });
    }
    if (dataType) return callFetchAndHandleJwt<T>(uri, params, dataType);
    if (externalUrl) return callFetchAndHandleJwt<T>(uri, params, undefined, externalUrl);
    return callFetchAndHandleJwt(uri, params);
}

export function postUri<T>(uri, body: any, dataType?: string, externalUrl?: boolean): Promise<T> {
    const params = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(body)
    };
    if (dataType) return callFetchAndHandleJwt(uri, params, dataType);
    if (externalUrl) return callFetchAndHandleJwt(uri, params, undefined, externalUrl);
    return callFetchAndHandleJwt(uri, params);
}

export function postFormUri<T>(uri, formData: FormData, dataType?: string, externalUrl?: boolean): Promise<T> {
    const params = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: formData,
    };

    if (dataType) return callFetchAndHandleJwt(uri, params, dataType);
    if (externalUrl) return callFetchAndHandleJwt(uri, params, undefined, externalUrl);
    return callFetchAndHandleJwt(uri, params);
}

export function putUri<T>(uri, body: any, dataType?: string, externalUrl?: boolean): Promise<T> {
    const params = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(body)
    };
    if (dataType) return callFetchAndHandleJwt(uri, params, dataType);
    if (externalUrl) return callFetchAndHandleJwt(uri, params, undefined, externalUrl);
    return callFetchAndHandleJwt(uri, params);
}

export function patchUri<T>(uri, body: any, dataType?: string): Promise<T> {
    const params = {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    if (dataType) return callFetchAndHandleJwt(uri, params, dataType);
    return callFetchAndHandleJwt(uri, params);
}

export function deleteUri<T>(uri, dataType?: string): Promise<T> {
    const params = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };
    if (dataType) return callFetchAndHandleJwt(uri, params, dataType);
    return callFetchAndHandleJwt(uri, params);
}

export function deleteUriWithBody<T>(uri, body: any, dataType?: string): Promise<T> {
    const params = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(body)
    };
    if (dataType) return callFetchAndHandleJwt(uri, params, dataType);
    return callFetchAndHandleJwt(uri, params);
}
