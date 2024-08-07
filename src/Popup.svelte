<script lang="ts">
  import { local } from "./lib/storage";

  let count = local("count");
</script>

<button on:click={() => $count++}>{$count}</button>
