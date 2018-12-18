import axios from 'axios'

export class BaseApiProvider {
	private baseUrl = 'http://localhost:3001'

	public async fetchApi(path: string, method: string, body?: {}, headers?: {}, ): Promise<any> {
			return new Promise<any>(async (res, rej) => {
				try {
					const result = await axios.request({
						data: JSON.stringify(body),		
						headers: {
							...headers,
							'Content-Type': 'application/json',
						},
						method,
						url: `${this.baseUrl}/${path}`,
					})
					res(result)
				} catch (err) {
					rej (err)
				}
			})
	}
}