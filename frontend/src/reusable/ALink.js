import React from 'react';
import { CLink } from '@coreui/react';

const ALink = ({ to, params = {}, children, ...props }) => {
	let path = to;
	for (const [key, value] of Object.entries(params)) {
		path = path.replace(`:${key}`, value);
	}
	return <CLink to={path}>{children}</CLink>;
};

export default ALink;
