<script lang="ts">
  import { knownInstances, knownHostnames, mappings, type Mapping } from "./lib/storage";

  function addMapping() {
    $mappings = [...$mappings, { hostname: "", instanceId: "" }];
  }

  function removeMapping(mapping: Mapping) {
    $mappings = $mappings.filter((x) => x != mapping);
  }
</script>

<div class="grid">
  {#each $mappings as mapping}
    <select>
      {#each $knownInstances as instance}
        <option value={instance.instanceId}>{instance.name} ({instance.instanceId})</option>
      {/each}
    </select>
    <select bind:value={mapping.hostname}>
      {#each $knownHostnames as hostname}
        <option value={hostname}>{hostname}</option>
      {/each}
    </select>
    <button on:click={() => removeMapping(mapping)}>remove</button>
  {/each}
  <button on:click={addMapping}>add mapping</button>
</div>

<style>
  .grid {
    width: 512px;
    display: grid;
    grid-template-columns: auto auto auto;
  }
</style>
