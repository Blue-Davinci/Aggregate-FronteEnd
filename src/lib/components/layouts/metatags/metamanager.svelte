<script>
	import { MetaTags } from 'svelte-meta-tags';

    export let pagemetadata = {};
    export let pageInfo = {};

    const metaTags = {
        title: `${pageInfo?.title || 'Aggregate'} • ${pagemetadata?.title || 'Unify!'}`,
        titleTemplate: pagemetadata?.titleTemplate || 'Aggregate',
        description: pagemetadata?.description || 'Unify, Simplify, Aggregate!',
        canonical: pagemetadata?.canonical || 'https://aggregate.com',
        openGraph: {
            ...pagemetadata?.openGraph,
            title: `${pagemetadata?.openGraph?.title || 'Aggregate'} - ${pageInfo?.title || 'Unify!'}`,
            description: `${pagemetadata?.openGraph?.description || 'Unify, Simplify, Aggregate!'} - ${pageInfo?.message || 'Unify, Simplify, Aggregate!'}`
        }
    };
</script>

<MetaTags {...metaTags} />
