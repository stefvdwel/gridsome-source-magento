<template>
    <div class="layout">
        <header class="header">
            <strong>
                <g-link to="/">{{ $static.metadata.siteName }}</g-link>
            </strong>
            <nav class="nav">
                <g-link class="nav__link" v-for="category in $static.allCategories.edges" v-bind:key="category.id"
                        :to="'category/' + category.node.custom_attributes
                        .find(customAttribute => customAttribute.attribute_code === 'url_key')
                        .value">
                    {{ category.node.name }}
                </g-link>
            </nav>
        </header>
        <slot/>
    </div>
</template>

<static-query>
query allCategories {
    metadata {
        siteName
    }
    allCategories {
        edges {
            node {
                id
                name
                custom_attributes {
                    attribute_code
                    value
                }
            }
        }
    }
}
</static-query>

<style>
body {
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.5;
}

.layout {
    max-width: 760px;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
}

.header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    height: 80px;
}

.nav__link {
    margin-left: 20px;
}
</style>
