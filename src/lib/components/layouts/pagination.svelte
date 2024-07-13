<script>
    import * as Pagination from '$lib/components/ui/pagination';
    import { Separator } from '$lib/components/ui/separator';
    import { createEventDispatcher } from 'svelte';
  
    //export let currentPage;
    export let totalPages;
    export let pageSize;
    export let totalRecords;
  
    
    const dispatch = createEventDispatcher();
  
    function handlePageChange(page) {
      dispatch('page-change', { page });
    }
  </script>
  <Separator class="mb-3" />
  <Pagination.Root count={totalRecords} perPage={pageSize} let:pages let:currentPage>
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.PrevButton on:click={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}/>
      </Pagination.Item>
      {#each pages as page (page.key)}
        {#if page.type === "ellipsis"}
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
        {:else}
          <Pagination.Item>
            <Pagination.Link {page} isActive={currentPage === page.value} on:click={() => handlePageChange(page.value)}>
              {page.value}
            </Pagination.Link>
          </Pagination.Item>
        {/if}
      {/each}
      <Pagination.Item>
        <Pagination.NextButton on:click={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}/>
      </Pagination.Item>
    </Pagination.Content>
  </Pagination.Root>
  