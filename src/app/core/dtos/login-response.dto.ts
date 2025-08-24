import { IdName, KeyName } from './commons.dto';

export interface AuthenticationResponse {
	user: UserAuthentication;
	roles: string[];
	token: TokensResponse;
	permissions: KeyName[];
}
// export interface AuthenticationResponse {
// 	user: UserAuthentication;
// }

export interface UserAuthentication {
	id: number;
	name: string;
	credential: string;
}

export interface TokensResponse {
	accessToken: string;
	refreshToken: string;
}

// export interface UserAuthentication {
// 	uuid:           string;
// 	curp:           string;
// 	name:           string;
// 	firstName:      string;
// 	secondName:     string;
// 	email:          string;
// 	avatar:         null;
// 	employeeNumber: string;
// 	job:            null;
// }
