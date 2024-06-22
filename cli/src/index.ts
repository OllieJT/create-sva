const main = async () => {
	console.log('Hello World!');

	process.exit(0);
};

main().catch((err) => {
	console.error('Critical Failure...');
	if (err instanceof Error) {
		console.error(err);
	} else {
		console.warn('🚧 An unknown error has occurred.');
		console.error(err);
	}
	process.exit(1);
});
