<svelte:options tag="emuos-titlebar" />

<script>
	import { onMount } from 'svelte'
	import { variables } from '$lib/variables'
	import Button from '$lib/components/Panel/Button.svelte'

	export let buttons = ['minimize', 'maximize', 'close']
	export let onMouseDown = () => {}

	let mounted = false

	$: if (mounted) {
		buttons = ['minimize', 'maximize', 'close']
	}

	onMount(() => {
		console.log('TitleBar.onMount')

		mounted = true
	})
</script>

<header class="title-bar {$$props.class || ''}" on:mousedown={onMouseDown} {...$$restProps}>
	<slot>TitleBar</slot>

	{#if variables?.USE_WEBCOMPONENTS}
		<nav>{#if buttons.includes('help')}<emuos-button type="icon" icon="Help"></emuos-button>{/if}{#if buttons.includes('fullscreen')}<emuos-button type="icon" icon="Fullscreen"></emuos-button>{/if}{#if buttons.includes('newtab')}<Button type="icon" icon="NewTab" />{/if}{#if buttons.includes('minimize')}<emuos-button type="icon" icon="Minimize"></emuos-button>{/if}{#if buttons.includes('maximize')}<emuos-button type="icon" icon="Maximize"></emuos-button>{/if}{#if buttons.includes('close')}<emuos-button type="icon" icon="Close"></emuos-button>{/if}</nav>
	{:else}
		<nav>{#if buttons.includes('help')}<Button type="icon" icon="Help" />{/if}{#if buttons.includes('fullscreen')}<Button type="icon" icon="Fullscreen" />{/if}{#if buttons.includes('newtab')}<Button type="icon" icon="NewTab" />{/if}{#if buttons.includes('minimize')}<Button type="icon" icon="Minimize" />{/if}{#if buttons.includes('maximize')}<Button type="icon" icon="Maximize" />{/if}{#if buttons.includes('close')}<Button type="icon" icon="Close" />{/if}</nav>
	{/if}
</header>

<style lang="scss">
	.title-bar {
		position: absolute;
		width: calc(100% - 8px);
		height: 18px;
		line-height: 18px;

		background-color: #000080;
		//background-color: #0a246a;
		//background: -webkit-gradient(linear, left top, right top, color-stop(0, #0a246a), color-stop(100%, #a6caf0)) !important;
		//background: -webkit-linear-gradient(left, #0a246a, #a6caf0) !important;

		text-indent: 4px;
		color: #fff;

		overflow: hidden;

		z-index: 1;

		nav {
			position: absolute;
			//top: 4px;
			top: 1px;
			//right: 4px;
			right: 1px;
		}

		&.dragging {
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;

			&.debug {
				border-bottom: 1px solid var(--color-debug-muted);
			}
		}

		&.debug {
			border-bottom: 1px solid var(--color-debug);
		}
	}
</style>