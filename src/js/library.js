const MOBILE_BP = 767;

function initLibrary() {
	const rows = document.querySelectorAll('.library-row');
	if (!rows.length) return;

	let openRow = null;

	const closeOpen = () => {
		if (!openRow) return;
		openRow.classList.remove('is-open');
		const expand = openRow.nextElementSibling;
		if (expand && expand.classList.contains('library-row__expand')) {
			expand.setAttribute('aria-hidden', 'true');
		}
		openRow = null;
	};

	const openSingleRow = (row) => {
		if (openRow === row) return;
		closeOpen();
		row.classList.add('is-open');
		const expand = row.nextElementSibling;
		if (expand && expand.classList.contains('library-row__expand')) {
			expand.setAttribute('aria-hidden', 'false');
		}
		openRow = row;
	};

	rows.forEach((row) => {
		row.addEventListener('click', (e) => {
			if (window.innerWidth > MOBILE_BP) return;
			e.preventDefault();
			openSingleRow(row);
		});
	});

	document.addEventListener('click', (e) => {
		if (window.innerWidth > MOBILE_BP) return;
		if (!openRow) return;
		const expand = openRow.nextElementSibling;
		if (openRow.contains(e.target)) return;
		if (expand && expand.contains(e.target)) return;
		closeOpen();
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') closeOpen();
	});

	window.addEventListener('resize', () => {
		if (window.innerWidth > MOBILE_BP) closeOpen();
	});
}

document.addEventListener('DOMContentLoaded', initLibrary);

export {};
