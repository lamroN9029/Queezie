<template>
	<div class="flex flex-col border rounded-lg m-4 p-4">
		<img
			:src="userPic"
			class="h-16 w-16 md:h-32 md:w-32 object-cover rounded-full"
			alt="userPic"
		/>
		<p class="h-4 w-16 md:h-6 md:w-32 truncate text-center">{{ username }}</p>
	</div>
</template>

<script>
export default {
	name: 'UserCard',
	props: {
		username: {
			type: String,
			require: true
		},
		userPic: {
			type: String,
			require: true
		}
	}
}
</script>

<style></style>
