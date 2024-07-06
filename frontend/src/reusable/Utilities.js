export const cleanObject = (obj) => {
	if (Array.isArray(obj)) {
		return obj
			.map((v) => (isObject(v) ? cleanObject(v) : v))
			.filter((v) => !(v == null));
	} else {
		return Object.entries(obj)
			.map(([k, v]) => [k, isObject(v) ? cleanObject(v) : v])
			.reduce(
				(a, [k, v]) =>
					v == null || (isObject(v) && isEmpty(v))
						? a
						: { ...a, [k]: v }, // : ((a[k] = v), a),
				{}
			);
	}
};

export const dataDiff = (lhs, rhs) => {
	if (lhs === rhs) return {}; // equal return no diff

	if (!isObject(lhs) || !isObject(rhs)) return rhs; // return updated rhs

	let diff = Object.keys(rhs).reduce((acc, key) => {
		if (key === "id" || (!lhs.hasOwnProperty(key) && !isEmpty(rhs[key])))
			return { ...acc, [key]: rhs[key] ?? null };

		if (Array.isArray(lhs[key]) || Array.isArray(rhs[key])) {
			if (lhs[key].length !== rhs[key].length) return { ...acc, [key]: rhs[key] };
			const d = dataDiff({ ...lhs[key] }, { ...rhs[key] });
			return isEmpty(d) ? acc : { ...acc, [key]: rhs[key] }; // Object.values(d)
		}

		if (isObject(lhs[key]) || isObject(rhs[key])) {
			const d = dataDiff(lhs[key], rhs[key]);
			return isEmpty(d) ? acc : { ...acc, [key]: d };
		}

		return lhs[key] === rhs[key]
			? acc
			: { ...acc, [key]: rhs[key] ?? null };
	}, {});

	console.log(diff);
	return Object.entries(diff).reduce((acc, [key, val]) => {
		return isObject(val) && isEmptyData(val) ? acc : { ...acc, [key]: val };
	}, {});
};

export const isObject = (o) => o != null && typeof o === "object";

export const isEmpty = (o) => Object.keys(o).length === 0;

export const isEmptyData = (o) => {
	const keys = Object.keys(o);
	console.log(keys);
	return keys.length === 1 && keys[0] === "id";
};
