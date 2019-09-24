<template>
    <baidu-map class="map" ak="vVmeefdcZxiHrUvdyoHquR4S" @ready="handler">
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    </baidu-map>
</template>

<script>

    export default {
        name: "home-map",
        components: {

        },
        mounted() {

        },
        data() {
            return {
                map: {
                    center: {
                        lng: 123,
                        lat: 30,
                    }
                }
            }
        },
        methods: {
            handler ({BMap, map}) {
                var point = new BMap.Point(114.3118287971, 30.5984342798)
                map.centerAndZoom(point, 13)
                var marker = new BMap.Marker(point) // 创建标注
                map.addOverlay(marker) // 将标注添加到地图中
            }
        }
    }
</script>

<style scoped>
    .map {
        width: 100%;
        height: 100%;
    }
</style>
