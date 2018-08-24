import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList
} from 'react-native';

import AppConst from '../../const/AppConst';


export default class SwiperComponent extends Component {

    static defaultProps = {
        data: [],
        currentPage: 0,
        horizontal: true,
        showDots: true,
        autoScroll: true,
        scrollEnabled: true,
        spaceTime: 3000,
    }

    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            currentPage: this.props.currentPage
        }
    }

    componentDidMount() {
        if (this.props.autoScroll && this.state.data.length > 0) {
            this.startAutoScroll();
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.data.length > 0) {
            this.setState({
                data: nextProps.data
            }, () => {
                if (this.props.autoScroll) {
                    this.startAutoScroll();
                }
            })
        }
    }


    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
    }


    startAutoScroll() {
        this.timer = setInterval(() => {
            if (this.state.currentPage == this.state.data.length - 1) {
                this.setState({ currentPage: 0 })
                this.swiper.scrollToIndex({ animated: false, index: 0, viewOffset: 0, viewPosition: 0.5 })
            } else {
                this.swiper.scrollToIndex({ animated: true, index: this.state.currentPage + 1, viewOffset: 0, viewPosition: 0.5 })
            }
        }, this.props.spaceTime)
    }


    stopAutoScroll() {
        this.timer && clearInterval(this.timer)
    }




    render() {
        return <View style={{ ...this.props.style }}>
            <FlatList ref={ref => this.swiper = ref}
                style={{ flex: 1 }}
                data={this.state.data}
                initialScrollIndex={this.state.currentPage}
                keyExtractor={(item, index) => index + ''}
                horizontal={this.props.horizontal}
                pagingEnabled={true}
                getItemLayout={(data, index) => (
                    { length: this.props.horizontal ? this.props.style.width : this.props.style.height, offset: this.props.horizontal ? this.props.style.width * index : this.props.style.height * index, index }
                )}
                scrollEnabled={this.props.scrollEnabled}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                onScrollBeginDrag={(e) => {
                    if (this.props.autoScroll) {
                        this.stopAutoScroll();
                    }
                }}
                onScrollEndDrag={(e) => {
                    if (this.props.autoScroll) {
                        this.startAutoScroll();
                    }
                }}
                onMomentumScrollEnd={(e) => {
                    if (this.props.horizontal) {
                        let num = parseInt(e.nativeEvent.contentOffset.x / this.props.style.width)
                        this.setState({ currentPage: num })
                    } else {
                        let num = parseInt(e.nativeEvent.contentOffset.y / this.props.style.height)
                        this.setState({ currentPage: num })
                    }
                }}
                renderItem={(item) => {
                    return this.props.renderItem ? this.props.renderItem(item.item, item.index) : this.renderItems(item.item, item.index)
                }}
            />

            {
                this.props.showDots ? <View style={{ position: 'absolute', bottom: AppConst.IS_IPHONEX ? 25 : 10, width: AppConst._SCREEN_WIDTH, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    {this.renderDots()}
                </View> : null
            }

        </View>
    }

    renderItems(item, index) {
        return <TouchableOpacity
            activeOpacity={0.6}
            key={index}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
                this.props.onItemPress && this.props.onItemPress(index)
            }}>
            <Image
                style={{ flex: 1, width: this.props.style.width, height: this.props.style.height }}
                resizeMode='contain'
                source={{ uri: item }}
            />
        </TouchableOpacity>

    }



    renderDots() {
        let arr = []
        for (let i = 0; i < this.state.data.length; i++) {
            arr.push(
                <View key={i}
                    style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: this.state.currentPage == i ? AppConst.MAIN_COLOR : '#cdcdcd', marginLeft: 6 }}
                />
            )
        }
        return arr
    }



}


