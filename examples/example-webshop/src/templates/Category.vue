<template>
    <div>
        <h1>Category: {{$page.category.name}}</h1>
    </div>
</template>

<script>
export default {
    name: "Category"
}
</script>

<page-query>
query categories($path: String!) {
    category: categories(path: $path) {
        name
        is_active
        position
        custom_attributes {
            attribute_code
            value
        }
    }
}
</page-query>

<style scoped>

</style>