import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default [
	{
		input: 'src/main.js',
		output: {
			name: 'd3',
			extend: true,
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			commonjs() 
		]//,
		//globals: Object.assign({}, ...Object.keys(meta.dependencies || {}).filter(key => /^d3-/.test(key)).map(key => ({[key]: "d3"})))
	},
	{
		input: 'src/main.js',
		output: [
			{ 
				file: pkg.main, format: 'cjs',
				name: 'd3',
				extend: true
			},
			{ 
				file: pkg.module, format: 'es',
				name: 'd3',
				extend: true				
			}
		]
	}
];
