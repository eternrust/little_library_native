export type RootStackParam = {
	Main: undefined
	Home: undefined
	Search: undefined
	MyPage: undefined
	Auth: { screen: 'Rending' | 'Login' | 'Signup' }
	Rending: undefined
	Login: undefined
	Signup: undefined
	Custom: { screen: 'CreateCustom' | 'DetailCustom' | 'EditCustom'; params?: { id: number; isMe?: boolean } }
	CreateCustom: undefined
	DetailCustom: undefined
	EditCustom: undefined
	MyPageEdit: undefined
	User: { screen: 'UserPage'; params: { id: number }}
	UserPage: undefined
}
