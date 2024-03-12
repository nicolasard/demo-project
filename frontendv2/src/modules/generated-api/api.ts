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
 * @interface AuthorizeRequest
 */
export interface AuthorizeRequest {
    /**
     * 
     * @type {string}
     * @memberof AuthorizeRequest
     */
    'authenticationType'?: AuthorizeRequestAuthenticationTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof AuthorizeRequest
     */
    'token'?: string;
}

export const AuthorizeRequestAuthenticationTypeEnum = {
    GoogleAuth: 'GOOGLE_AUTH',
    DemoAccount: 'DEMO_ACCOUNT'
} as const;

export type AuthorizeRequestAuthenticationTypeEnum = typeof AuthorizeRequestAuthenticationTypeEnum[keyof typeof AuthorizeRequestAuthenticationTypeEnum];

/**
 * Categories for the expenses
 * @export
 * @interface Category
 */
export interface Category {
    /**
     * 
     * @type {number}
     * @memberof Category
     */
    'categoryId'?: number;
    /**
     * 
     * @type {string}
     * @memberof Category
     */
    'categoryName'?: string;
}
/**
 * The ISO 4217 currencies table.
 * @export
 * @interface Currency
 */
export interface Currency {
    /**
     * 
     * @type {string}
     * @memberof Currency
     */
    'currencyCode'?: string;
    /**
     * 
     * @type {string}
     * @memberof Currency
     */
    'currencyDescription'?: string;
    /**
     * 
     * @type {string}
     * @memberof Currency
     */
    'currencySymbol'?: string;
}
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
 * The total amount of transactions in a day
 * @export
 * @interface TotalDay
 */
export interface TotalDay {
    /**
     * 
     * @type {number}
     * @memberof TotalDay
     */
    'day'?: number;
    /**
     * 
     * @type {number}
     * @memberof TotalDay
     */
    'total'?: number;
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
    /**
     * 
     * @type {Category}
     * @memberof Transaction
     */
    'category'?: Category;
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
    /**
     * 
     * @type {Currency}
     * @memberof UserProfile
     */
    'defaultCurrency'?: Currency;
}

/**
 * UserControllerApi - axios parameter creator
 * @export
 */
export const UserControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {AuthorizeRequest} authorizeRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authenticate: async (authorizeRequest: AuthorizeRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorizeRequest' is not null or undefined
            assertParamExists('authenticate', 'authorizeRequest', authorizeRequest)
            const localVarPath = `/api/authenticate`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(authorizeRequest, localVarRequestOptions, configuration)

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
        deleteTransactions: async (transaction: Transaction, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'transaction' is not null or undefined
            assertParamExists('deleteTransactions', 'transaction', transaction)
            const localVarPath = `/api/transactions`;
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
        getCategories: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/categories`;
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
        getProfile: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/getProfile`;
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
         * @param {number} transactionId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransaction: async (transactionId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'transactionId' is not null or undefined
            assertParamExists('getTransaction', 'transactionId', transactionId)
            const localVarPath = `/api/transactions/{transactionId}`
                .replace(`{${"transactionId"}}`, encodeURIComponent(String(transactionId)));
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
         * @param {number} month 
         * @param {number} year 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransactionsPage: async (month: number, year: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'month' is not null or undefined
            assertParamExists('getTransactionsPage', 'month', month)
            // verify required parameter 'year' is not null or undefined
            assertParamExists('getTransactionsPage', 'year', year)
            const localVarPath = `/api/transactions`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (month !== undefined) {
                localVarQueryParameter['month'] = month;
            }

            if (year !== undefined) {
                localVarQueryParameter['year'] = year;
            }


    
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
         * @param {number} month 
         * @param {number} year 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransactionsReport: async (month: number, year: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'month' is not null or undefined
            assertParamExists('getTransactionsReport', 'month', month)
            // verify required parameter 'year' is not null or undefined
            assertParamExists('getTransactionsReport', 'year', year)
            const localVarPath = `/api/transactions/monthly-report/{year}/{month}`
                .replace(`{${"month"}}`, encodeURIComponent(String(month)))
                .replace(`{${"year"}}`, encodeURIComponent(String(year)));
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
            const localVarPath = `/api/transactions`;
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
            const localVarPath = `/api/transactions`;
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
         * @param {AuthorizeRequest} authorizeRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authenticate(authorizeRequest: AuthorizeRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.authenticate(authorizeRequest, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['UserControllerApi.authenticate']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
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
        async getCategories(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Category>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCategories(options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['UserControllerApi.getCategories']?.[index]?.url;
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
         * @param {number} transactionId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTransaction(transactionId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Transaction>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getTransaction(transactionId, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['UserControllerApi.getTransaction']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @param {number} month 
         * @param {number} year 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTransactionsPage(month: number, year: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Transaction>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getTransactionsPage(month, year, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['UserControllerApi.getTransactionsPage']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @param {number} month 
         * @param {number} year 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTransactionsReport(month: number, year: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<TotalDay>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getTransactionsReport(month, year, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['UserControllerApi.getTransactionsReport']?.[index]?.url;
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
         * @param {AuthorizeRequest} authorizeRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authenticate(authorizeRequest: AuthorizeRequest, options?: any): AxiosPromise<string> {
            return localVarFp.authenticate(authorizeRequest, options).then((request) => request(axios, basePath));
        },
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
        getCategories(options?: any): AxiosPromise<Array<Category>> {
            return localVarFp.getCategories(options).then((request) => request(axios, basePath));
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
         * @param {number} transactionId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransaction(transactionId: number, options?: any): AxiosPromise<Transaction> {
            return localVarFp.getTransaction(transactionId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} month 
         * @param {number} year 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransactionsPage(month: number, year: number, options?: any): AxiosPromise<Array<Transaction>> {
            return localVarFp.getTransactionsPage(month, year, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} month 
         * @param {number} year 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransactionsReport(month: number, year: number, options?: any): AxiosPromise<Array<TotalDay>> {
            return localVarFp.getTransactionsReport(month, year, options).then((request) => request(axios, basePath));
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
     * @param {AuthorizeRequest} authorizeRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserControllerApi
     */
    public authenticate(authorizeRequest: AuthorizeRequest, options?: AxiosRequestConfig) {
        return UserControllerApiFp(this.configuration).authenticate(authorizeRequest, options).then((request) => request(this.axios, this.basePath));
    }

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
    public getCategories(options?: AxiosRequestConfig) {
        return UserControllerApiFp(this.configuration).getCategories(options).then((request) => request(this.axios, this.basePath));
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
     * @param {number} transactionId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserControllerApi
     */
    public getTransaction(transactionId: number, options?: AxiosRequestConfig) {
        return UserControllerApiFp(this.configuration).getTransaction(transactionId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {number} month 
     * @param {number} year 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserControllerApi
     */
    public getTransactionsPage(month: number, year: number, options?: AxiosRequestConfig) {
        return UserControllerApiFp(this.configuration).getTransactionsPage(month, year, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {number} month 
     * @param {number} year 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserControllerApi
     */
    public getTransactionsReport(month: number, year: number, options?: AxiosRequestConfig) {
        return UserControllerApiFp(this.configuration).getTransactionsReport(month, year, options).then((request) => request(this.axios, this.basePath));
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



