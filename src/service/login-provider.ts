import { BaseApiProvider } from './base-api';

export class LoginProvider extends BaseApiProvider {
	public normalLogin(email: string, password: string) {
		const result = this.fetchApi('firebase/signin', 'POST', {
			email,
			password
		})
		return result
	}

	public async authenticate(token: string, provider: string) {
		const result = await this.fetchApi('firebase/authenticate', 'GET', undefined, {
			provider,			
			token,
		})

		console.log('result: ', result)

		return result.data
	}
}