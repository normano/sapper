import { cid, history, navigate, select_target } from '../router';
import { get_base_uri } from '../baseuri_helper';
import { canNavigate } from '../onNavigate/index';

export default async function goto(
	href: string,
	opts: { noscroll?: boolean; replaceState?: boolean } = { noscroll: false, replaceState: false }
): Promise<void> {
	const target = select_target(new URL(href, get_base_uri(document)));

	if (target) {
		if (!(await canNavigate(target.page))) {
			return;
		}
		history[opts.replaceState ? 'replaceState' : 'pushState']({ id: cid }, '', href);
		return navigate(target, null, opts.noscroll);
	}

	location.href = href;
	return new Promise(() => {
		/* never resolves */
	});
}
