/* tslint:disable */
/* eslint-disable */
/**
 * Demo project
 * Documentation APIs v1.0
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError, operationServerMap } from './base';

/**
 * 
 * @export
 * @interface ErrorResponse
 */
export interface ErrorResponse {
    /**
     * 
     * @type {string}
     * @memberof ErrorResponse
     */
    'errorDescription'?: string;
    /**
     * 
     * @type {Array<ErrorResponsesDetails>}
     * @memberof ErrorResponse
     */
    'errorResponsesDetailsList'?: Array<ErrorResponsesDetails>;
}
/**
 * 
 * @export
 * @interface ErrorResponsesDetails
 */
export interface ErrorResponsesDetails {
    /**
     * 
     * @type {string}
     * @memberof ErrorResponsesDetails
     */
    'field'?: string;
    /**
     * 
     * @type {string}
     * @memberof ErrorResponsesDetails
     */
    'message'?: string;
}
/**
 * Transactions made.
 * @export
 * @interface Transaction
 */
export interface Transaction {
    /**
     * 
     * @type {number}
     * @memberof Transaction
     */
    'id'?: number;
    /**
     * 
     * @type {number}
     * @memberof Transaction
     */
    'amount': number;
    /**
     * 
     * @type {string}
     * @memberof Transaction
     */
    'currency': string;
    /**
     * 
     * @type {string}
     * @memberof Transaction
     */
    'date': string;
    /**
     * 
     * @type {number}
     * @memberof Transaction
     */
    'userInternalId'?: number;
    /**
     * 
     * @type {string}
     * @memberof Transaction
     */
    'description'?: string;
}
/**
 * The user information in the system.
 * @export
 * @interface UserProfile
 */
export interface UserProfile {
    /**
     * 
     * @type {string}
     * @memberof UserProfile
     */
    'fullName'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserProfile
     */
    'email'?: string;
    /**
     * 
     * @type {number}
     * @memberof UserProfile
     */
    'internalId'?: number;
}

/**
 * UserControllerApi - axios parameter creator
 * @export
 */
export const UserControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {Transaction} transaction 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteTransactions: async (transaction: Transaction, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'transaction' is not null or undefined
            assertParamExists('deleteTransactions', 'transaction', transaction)
            const localVarPath = `/transactions`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(transaction, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getProfile: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/getProfile`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransactions: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/transactions`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {Transaction} transaction 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postTransactions: async (transaction: Transaction, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'transaction' is not null or undefined
            assertParamExists('postTransactions', 'transaction', transaction)
            const localVarPath = `/transactions`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(transaction, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {Transaction} transaction 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        putTransactions: async (transaction: Transaction, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'transaction' is not null or undefined
            assertParamExists('putTransactions', 'transaction', transaction)
            const localVarPath = `/transactions`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(transaction, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UserControllerApi - functional programming interface
 * @export
 */
export const UserControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UserControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {Transaction} transaction 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteTransactions(transaction: Transaction, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteTransactions(transaction, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['UserControllerApi.deleteTransactions']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getProfile(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserProfile>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getProfile(options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['UserControllerApi.getProfile']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTransactions(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Transaction>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getTransactions(options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['UserControllerApi.getTransactions']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @param {Transaction} transaction 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async postTransactions(transaction: Transaction, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Transaction>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.postTransactions(transaction, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['UserControllerApi.postTransactions']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @param {Transaction} transaction 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async putTransactions(transaction: Transaction, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Transaction>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.putTransactions(transaction, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['UserControllerApi.putTransactions']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    }
};

/**
 * UserControllerApi - factory interface
 * @export
 */
export const UserControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UserControllerApiFp(configuration)
    return {
        /**
         * 
         * @param {Transaction} transaction 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteTransactions(transaction: Transaction, options?: any): AxiosPromise<void> {
            return localVarFp.deleteTransactions(transaction, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getProfile(options?: any): AxiosPromise<UserProfile> {
            return localVarFp.getProfile(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransactions(options?: any): AxiosPromise<Array<Transaction>> {
            return localVarFp.getTransactions(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {Transaction} transaction 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postTransactions(transaction: Transaction, options?: any): AxiosPromise<Transaction> {
            return localVarFp.postTransactions(transaction, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {Transaction} transaction 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        putTransactions(transaction: Transaction, options?: any): AxiosPromise<Transaction> {
            return localVarFp.putTransactions(transaction, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UserControllerApi - object-oriented interface
 * @export
 * @class UserControllerApi
 * @extends {BaseAPI}
 */
export class UserControllerApi extends BaseAPI {
    /**
     * 
     * @param {Transaction} transaction 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserControllerApi
     */
    public deleteTransactions(transaction: Transaction, options?: AxiosRequestConfig) {
        return UserControllerApiFp(this.configuration).deleteTransactions(transaction, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserControllerApi
     */
    public getProfile(options?: AxiosRequestConfig) {
        return UserControllerApiFp(this.configuration).getProfile(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserControllerApi
     */
    public getTransactions(options?: AxiosRequestConfig) {
        return UserControllerApiFp(this.configuration).getTransactions(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {Transaction} transaction 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserControllerApi
     */
    public postTransactions(transaction: Transaction, options?: AxiosRequestConfig) {
        return UserControllerApiFp(this.configuration).postTransactions(transaction, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {Transaction} transaction 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserControllerApi
     */
    public putTransactions(transaction: Transaction, options?: AxiosRequestConfig) {
        return UserControllerApiFp(this.configuration).putTransactions(transaction, options).then((request) => request(this.axios, this.basePath));
    }
}


