import React, { Component } from 'react';

import { StyleProp, ViewStyle } from 'react-native';

interface SwiperProps {

    /**
     * 样式
     */
    style?: StyleProp<ViewStyle>,

    /**
     * 數據源
     */
    data: Array<string>,

    /**
     * 當前的 index default:0
     */
    currentPage?: number,

    /**
     * 是否橫向滑動 default :true
     */
    horizontal?: boolean,

    /**
     * 是否展示下面指示點  default:true
     */
    showDots?: boolean,

    /**
     * 是否自動滾動 默認 true
     */
    autoScroll?: boolean,

    /**
     * 自動滾動間隔時間
     */
    spaceTime?: number,

    /**
     * 自定義 item
     */
    renderItem?: (item: any, index: number) => React.ReactElement<any>,

    /**
     * item的點擊事件
     */
    onItemPress?: (selectedIndex: number) => void,
}

export default class Swiper extends Component<SwiperProps, {}> { }
