<script>
    import Announcementstats from '$lib/components/layouts/admin/adminannouncements/announcementstats.svelte';
    import Addannouncement from '$lib/components/layouts/admin/adminannouncements/addannouncement.svelte';
    import Announcementcards from '$lib/components/layouts/cards/announcementcards.svelte';
	export let data;
    export let form;
	let announcements = data?.announcements ?? [];

    const handleDeletedAnnouncement = (event) => {
        //console.log('Deleted Announcement ID: ', id);
        let id = event.detail;
        announcements = announcements.filter((a) => a.id !== id);
    };

    const handleAddAnnouncement = (announcement) => {
        //console.log('Announcement: ', announcement);
        announcements = [announcement.detail,...announcements];
    };

	const isExpired = (expires_at) => {
		return new Date() > new Date(expires_at);
	};
</script>

<Announcementstats {announcements} {isExpired}/>
<Announcementcards {announcements} {isExpired} on:deleteAnnouncement={handleDeletedAnnouncement}/>
<Addannouncement {form} on:addAnnouncement={handleAddAnnouncement}/>

