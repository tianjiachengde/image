<template>
    <div :style="{ position: `relative` }">
        <div
                :style="{
        height: `${height}px`,
        width: `${width}px`
      }"
                @mousedown="handleMousedown"
                @mouseup="handleMouseup"
                @mousemove="handleMousemove"
                ref="box"
        >
            <img
                    alt="example"
                    :src="url"
                    slot="cover"
                    :style="{ height: `${height}px`, width: `${width}px` }"
            />
            <div
                    id="select-area"
                    class="border absolute"
                    :class="{ hidden: !borderIsShow }"
                    v-if="borderIsShow"
                    :style="{
          width: `${selectedArea.width}px`,
          height: `${selectedArea.height}px`,
          top: `${selectedArea.startY}px`,
          left: `${selectedArea.startX}px`
        }"
            >
                <div
                        id="left-top"
                        class="border-point-response-area north-west"
                        v-if="borderIsShow"
                        :class="{ hidden: !borderIsShow }"
                        :style="{ top: `-5.5px`, left: `-5.5px` }"
                >
                    <div class="border-point"></div>
                </div>
                <div
                        id="right-top"
                        class="border-point-response-area north-east"
                        v-if="borderIsShow"
                        :class="{ hidden: !borderIsShow }"
                        :style="{ top: `-5.5px`, left: `${selectedArea.width - 6.5}px` }"
                >
                    <div class="border-point"></div>
                </div>
                <div
                        id="left-down"
                        class="border-point-response-area south-west"
                        v-if="borderIsShow"
                        :class="{ hidden: !borderIsShow }"
                        :style="{ top: `${selectedArea.height - 7}px`, left: `-5.5px` }"
                >
                    <div class="border-point"></div>
                </div>
                <div
                        id="right-down"
                        class="border-point-response-area south-east"
                        v-if="borderIsShow"
                        :class="{ hidden: !borderIsShow }"
                        :style="{
            top: `${selectedArea.height - 6.5}px`,
            left: `${selectedArea.width - 6.5}px`
          }"
                >
                    <div class="border-point"></div>
                </div>
            </div>
        </div>
        <div
                class="absolute function-menu"
                v-if="isMouseup()"
                :style="{
        width: `${selectedArea.width}px`,
        top: `${selectedArea.startY + selectedArea.height + 5}px `,
        left: `${selectedArea.startX}px`
      }"
        >
            <img class="c-icon" src="./img/cancel.png" @click="cancel" alt=""/>
            <img class="r-icon" src="./img/right.png" @click="right" alt=""/>
        </div>
    </div>
</template>

<script>

    const MOUSE_DOWNING = 'down';
    const MOUSE_UP = 'up';
    const MOUSE_MOVE_DRAG = 'drag';
    const MOUSE_MOVE_ZOOM = 'zoom';
    export default {
        components: {
        },
        props: {
            width: {
                type: Number,
                default: 0,
            },
            height: {
                type: Number,
                default: 0,
            },
            url: {
                type: String,
                default: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
            },
        },
        data() {
            return {
                borderIsShow: false,
                mouseEvenStatus: '',
                mouseMoveEvenStatus: '',
                zoom: {
                    status: false,
                    zoomId: '',
                },
                dragInfo: {
                    status: false,
                    startX: 0,
                    startY: 0,
                    selectedAreaStartTop: 0,
                    selectedAreaStartLeft: 0,
                },
                rootPosition: {
                    x: 0,
                    y: 0,
                },
                selectedArea: {
                    width: 0,
                    height: 0,
                    startX: 0,
                    startY: 0,
                },
                start: {
                    startX: 0,
                    startY: 0,
                },
            };
        },
        methods: {
            handleMousedown(e) {
                window.console.log(e);
                e.preventDefault();
                if (!Object.is(this.mouseEvenStatus, MOUSE_UP)) {
                    this.borderIsShow = true;
                    this.mouseEvenStatus = MOUSE_DOWNING;
                    const position = this.$refs.box.getBoundingClientRect();
                    Object.assign(this.rootPosition, { x: position.x, y: position.y });
                    // 获取点下鼠标时的位置
                    Object.assign(this.start, { startX: e.clientX, startY: e.clientY });
                    Object.assign(this.selectedArea, this.getRelativePosition(e));
                } else if (this.isZoomPoint(e.target) && this.isMouseup()) {
                    this.mouseEvenStatus = MOUSE_DOWNING;
                    this.mouseMoveEvenStatus = MOUSE_MOVE_ZOOM;
                    const id = e.target.id || e.target.parentNode.id;
                    Object.assign(this.zoom, { status: true, zoomId: id });
                    this.zoomStart = this.getZoomStart(id);
                } else if (this.isDrag(e.target) && this.isMouseup()) {
                    window.console.log(123);
                    const dragInfo = {
                        status: true,
                        startX: e.clientX,
                        startY: e.clientY,
                        selectedAreaStartTop: this.selectedArea.startY,
                        selectedAreaStartLeft: this.selectedArea.startX,
                    };
                    Object.assign(this.dragInfo, dragInfo);
                    this.mouseEvenStatus = MOUSE_DOWNING;
                    this.mouseMoveEvenStatus = MOUSE_MOVE_DRAG;
                }
            },
            handleMouseup(e) {
                if (Object.is(this.mouseEvenStatus, MOUSE_DOWNING)) {
                    if (Object.is(this.mouseMoveEvenStatus, MOUSE_MOVE_ZOOM)) {
                        const id = e.target.id || e.target.parentNode.id;
                        window.console.log(id);
                        this.calculateStartPosition(e.clientX, e.clientY, this.zoom.zoomId);
                        Object.assign(this.zoom, { status: false, zoomId: '' });
                    } else if (Object.is(this.mouseMoveEvenStatus, MOUSE_MOVE_DRAG)) {
                        // this.calculateStartPositionWhenDrag();
                    }
                    this.mouseEvenStatus = MOUSE_UP;
                    this.mouseMoveEvenStatus = '';
                }
            },
            isMouseup() {
                return Object.is(this.mouseEvenStatus, MOUSE_UP);
            },
            handleMousemove: function (e) {
                const flag = Object.is(this.mouseEvenStatus, MOUSE_DOWNING);
                if (flag) {
                    const x = e.clientX;
                    const y = e.clientY;
                    if (this.isOutOfBand(x, y)) {
                        this.handelOutOfBands(e);
                        return;
                    }
                    if (Object.is(this.mouseMoveEvenStatus, MOUSE_MOVE_DRAG)) {
                        this.handleDrag(e);
                    } else {
                        let curStartPoint = {};
                        if (Object.is(this.mouseMoveEvenStatus, MOUSE_MOVE_ZOOM)) {
                            curStartPoint = this.zoomStart;
                        } else {
                            curStartPoint = this.start;
                        }
                        const width = x - curStartPoint.startX;
                        const height = y - curStartPoint.startY;
                        if (width < 0) {
                            Object.assign(this.selectedArea, {
                                startX: x - this.rootPosition.x,
                            });
                        }
                        if (height < 0) {
                            Object.assign(this.selectedArea, {
                                startY: y - this.rootPosition.y,
                            });
                        }
                        this.selectedArea.width = Math.abs(width);
                        this.selectedArea.height = Math.abs(height);
                    }
                }
            },
            handleDrag(e) {
                const dragWidth = e.clientX - this.dragInfo.startX;
                const dragHeight = e.clientY - this.dragInfo.startY;
                const curLeft = this.dragInfo.selectedAreaStartLeft + dragWidth;
                const curTop = this.dragInfo.selectedAreaStartTop + dragHeight;
                const maxLeft = this.width - this.selectedArea.width;
                const maxTop = this.height - this.selectedArea.height;
                this.selectedArea.startX = this.handleDragBand(curLeft, maxLeft);
                this.selectedArea.startY = this.handleDragBand(curTop, maxTop);
            },
            handleDragBand(cur, max) {
                if (cur < 0) {
                    return 0;
                }
                if (cur > max) {
                    return max;
                }
                return cur;
            },
            handelOutOfBands(e) {
                this.handleMouseup(e);
            },
            isOutOfBand(x, y) {
                return (
                    x >= this.rootPosition.x + this.width
                    || y >= this.rootPosition.y + this.height
                );
            },
            getZoomStart(id) {
                window.console.log(`id${id}`);
                let obj = {};
                const x = this.start.startX;
                const y = this.start.startY;
                switch (id) {
                    case 'left-top':
                        obj = {
                            startX: x + this.selectedArea.width,
                            startY: y + this.selectedArea.height,
                        };
                        break;
                    case 'right-top':
                        obj = { startX: x, startY: y + this.selectedArea.height };
                        break;
                    case 'right-down':
                        Object.assign(obj, this.start);
                        break;
                    case 'left-down':
                        obj = {
                            startX: x + this.selectedArea.width,
                            startY: y,
                        };
                        break;
                    default:
                        Object.assign(obj, this.start);
                        break;
                }
                window.console.log('zoomstart');
                window.console.log(obj);
                return obj;
            },
            initBorder() {
                this.borderIsShow = false;
                this.mouseEvenStatus = '';
                this.mouseMoveEvenStatus = '';
                Object.assign(this.start, { startX: 0, startY: 0 });
                Object.assign(this.selectedArea, {
                    width: 0,
                    height: 0,
                    startX: 0,
                    startY: 0,
                });
            },
            getRelativePosition(e) {
                return {
                    startX: e.clientX - this.rootPosition.x,
                    startY: e.clientY - this.rootPosition.y,
                };
            },
            calculateStartPosition(clientX, clientY, zoomId) {
                const curZoomId = this.judgeCurId(
                    { x: clientX, y: clientY },
                    { x: this.zoomStart.startX, y: this.zoomStart.startY },
                    zoomId,
                );
                if (Object.is(curZoomId, 'left-top')) {
                    Object.assign(this.start, { startX: clientX, startY: clientY });
                } else if (Object.is(curZoomId, 'left-down')) {
                    Object.assign(this.start, {
                        startX: clientX,
                        startY: clientY - this.selectedArea.height,
                    });
                } else if (Object.is(curZoomId, 'right-top')) {
                    Object.assign(this.start, {
                        startX: clientX - this.selectedArea.width,
                    });
                }
                window.console.log('重新计算后的开始位置');
                window.console.log(this.start);
            },
            judgeCurId(startPoint, curPoint, zoomId) {
                const map = new Map([
                    ['left', 'right'],
                    ['right', 'left'],
                    ['top', 'down'],
                    ['down', 'top'],
                ]);
                const res = '';
                const idarray = zoomId.splice('-');
                if (startPoint.x < curPoint.x) {
                    res.padEnd(map.get(idarray[0]));
                }
                if (startPoint.y < curPoint.y) {
                    res.padEnd(map.get(idarray[1]));
                }
                return res;
            },
            isZoomPoint(node) {
                const classes = node.className;
                return (
                    classes.includes('border-point')
                    || classes.includes('border-point-response-area')
                );
            },
            isDrag(node) {
                return node.id === 'select-area';
            },
            cancel(e) {
                window.console.log(e);
                e.stopPropagation();
                this.initBorder();
            },
            right() {
                this.$emit('image-info', {
                    left: this.selectedArea.startX,
                    top: this.selectedArea.startY,
                    width: this.selectedArea.width,
                    height: this.selectedArea.height,
                });
                this.initBorder();
            },
        },
    };
</script>

<style lang="css" src='./index.css' scoped>

</style>
