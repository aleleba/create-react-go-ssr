import { Workbox } from 'workbox-window';
import packageJson from './package.json';

const serviceWorkerRegistration = () => {
	if ('serviceWorker' in navigator) {
		const wb = new Workbox('service-worker.js');

		wb.addEventListener('installed', event => {
			if(event.isUpdate){
				if(confirm('New app update is avaible, Click Ok to refresh')){
					window.location.reload();
				};
				console.log(`Se actualiza la app a version ${packageJson.version}`);
			};
		});
	  
		wb.register();
	};
};

export default serviceWorkerRegistration;