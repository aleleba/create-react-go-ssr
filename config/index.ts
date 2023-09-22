export const deFaultValues = {
	ENV: 'production',
	PORT: 80,
	PUBLIC_URL: 'auto',
	PREFIX_URL: '',
	ONLY_EXACT_PATH: false,
};

export const config = {
	ENV: process.env.ENV ? process.env.ENV : deFaultValues.ENV,
	PORT: process.env.PORT ? process.env.PORT : deFaultValues.PORT,
	PUBLIC_URL: process.env.PUBLIC_URL ? process.env.PUBLIC_URL : deFaultValues.PUBLIC_URL,
	PREFIX_URL: process.env.PREFIX_URL ? process.env.PREFIX_URL : deFaultValues.PREFIX_URL,
	ONLY_EXACT_PATH: process.env.ONLY_EXACT_PATH ? process.env.ONLY_EXACT_PATH === 'true' : deFaultValues.ONLY_EXACT_PATH,
};

export default config;
