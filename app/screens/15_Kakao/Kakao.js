// @flow
import React, { Component } from 'react';
import RootStackNavigation from '../../AppNavigation';
import { PopupModal } from '../../components/modals';
import type { Channel } from './ChannelItem';
import ChannelItem from './ChannelItem';
import { KakaoRepository } from '../../util/network/repository';
import { LogModule } from '../../util/native_modules'

import {
    FlatList,
    Image,
    Linking,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';

type Props = {
    navigation: RootStackNavigation
};

type State = {
    isModalVisibility: boolean,
    channel?: ?Channel,
    channels: Channel[],
    searchChannels: Channel[]
};

export default class Kakao extends Component<Props, State> {

    static navigationOptions = ({ navigation }: RootStackNavigation) => {
        let params = navigation.state.params;
        return {
            header: null
        }
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            isModalVisibility: false,
            channels: [],
            searchChannels: []
        };
    }

    componentDidMount() {
        this.fetchKakaoRepository();
    }

    fetchKakaoRepository() {
        KakaoRepository.fetchChannels()
            .then((responseJson) => {
                this.setState((state) => {
                    return {
                        channels: responseJson.channels,
                        searchChannels: responseJson.channels,
                    }
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onPressCloseButton = () => {
        this.props.navigation.goBack();
    }

    onPressMinimizeButton = () => {
        LogModule.e("onPressMinimizeButton");
        ToastAndroid.show('onPressMinimizeButton', ToastAndroid.SHORT);
    }

    onPressMaximizeButton = async () => {
        let intentUrl: string = "kotlin://kwon.seokchan.androidwithkotlinpractice/MainActivity";
        let supported = await Linking.openURL(intentUrl);
        if (supported) {
            Linking.openURL(intentUrl)
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    onPressChannel = (item: Channel) => {
        return () => {
            this.setState((state) => {
                return {
                    channel: item,
                    isModalVisibility: true
                }
            });
        }
    }

    onPressModalPositive = () => {
        ToastAndroid.show("onPressModal.Positive", ToastAndroid.SHORT);
    }

    onPressModalNegative = () => {
        ToastAndroid.show("onPressModal.Negative", ToastAndroid.SHORT);
    }

    onModalDismiss = () => {
        ToastAndroid.show("onModalDismiss", ToastAndroid.SHORT);
    }

    onChangedSearchBarText = (text: string) => {
        let searchChannels: any[];

        if (!text) {
            searchChannels = this.state.channels.slice();

        } else {
            searchChannels = [];
            for (let channel of this.state.channels) {
                if (channel.name.includes(text)) {
                    searchChannels.push(channel);
                }
            }
        }
        this.setState((state) => {
            return {
                searchChannels: searchChannels
            }
        });
    }

    keyExtractor = (item: any, index: number) => {
        return item.id || item;
    };

    renderChannelItem = ({ item }: any) => {
        return (
            <ChannelItem
                channel={item}
                onPress={this.onPressChannel(item)} />
        );
    }

    render() {
        let channel = this.state.channel;

        let homeIcon = require('../../res/Images/DrawerIcon/ic_home.png')
        let mailIcon = require('../../res/Images/DrawerIcon/ic_mail.png')
        let moreIcon = require('../../res/Images/DrawerIcon/ic_more.png')
        let noticeIcon = require('../../res/Images/DrawerIcon/ic_notification.png')
        let settingIcon = require('../../res/Images/DrawerIcon/ic_setting.png')
        let addIcon = require('../../res/Images/DrawerIcon/ic_add.png')

        return (
            <View style={styles.display}>

                <View style={styles.iosStatusBar} />

                <View style={styles.container}>

                    <View style={styles.optionBar}>

                        <View style={styles.controllButtons}>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={this.onPressCloseButton}>

                                <View
                                    style={styles.closeButton} />

                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={this.onPressMinimizeButton}>

                                <View
                                    style={styles.minimizeButton} />

                            </TouchableOpacity>


                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={this.onPressMaximizeButton}>

                                <View
                                    style={styles.maximizeButton} />

                            </TouchableOpacity>

                        </View>

                        <TouchableOpacity
                            activeOpacity={0.7}>

                            <Image
                                style={styles.homeTabIcon}
                                source={homeIcon}
                                resizeMode={'contain'}
                                tintColor={'#ffffff'} />

                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.7}>

                            <Image
                                style={styles.mailTabIcon}
                                source={mailIcon}
                                resizeMode={'contain'}
                                tintColor={'#A09B98'} />

                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.7}>

                            <Image
                                style={styles.moreTabIcon}
                                source={moreIcon}
                                resizeMode={'contain'}
                                tintColor={'#A09B98'} />

                        </TouchableOpacity>

                        <View style={styles.flexDummy} />

                        <View style={styles.bottomTabs}>

                            <TouchableOpacity
                                activeOpacity={0.7}>

                                <Image
                                    style={styles.noticeTabIcon}
                                    source={noticeIcon}
                                    resizeMode={'contain'}
                                    tintColor={'#A09B98'} />

                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.7}>

                                <Image
                                    style={styles.settingTabIcon}
                                    source={settingIcon}
                                    resizeMode={'contain'}
                                    tintColor={'#A09B98'} />

                            </TouchableOpacity>

                        </View>

                    </View>

                    <View style={styles.contents}>

                        <View style={styles.header}>

                            <Text style={styles.headerTitle}>
                                {'채팅'}
                            </Text>

                            <View style={styles.flexDummy} />

                            <TouchableOpacity
                                activeOpacity={0.7}>

                                <Image
                                    style={styles.addIcon}
                                    source={addIcon}
                                    resizeMode={'contain'} />

                            </TouchableOpacity>

                        </View>

                        <View style={styles.headerLine} />

                        <TextInput
                            style={styles.searchBar}
                            placeholder={'채팅방 이름, 참여자 검색'}
                            placeholderTextColor={'#9b9b9b'}
                            underlineColorAndroid={'#ffffffff'}
                            onChangeText={this.onChangedSearchBarText} />

                        <View style={styles.searchLine} />

                        <FlatList
                            style={styles.channelList}
                            data={this.state.searchChannels}
                            renderItem={this.renderChannelItem}
                            keyExtractor={this.keyExtractor} />

                    </View>

                    <PopupModal
                        title={channel ? channel.name : ""}
                        description={channel ? channel.preview : ""}
                        visible={this.state.isModalVisibility}
                        onPressPositive={this.onPressModalPositive}
                        onPressNegative={this.onPressModalNegative}
                        onDismiss={this.onModalDismiss}
                        dimAmount={0.7} />

                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    display: {
        flex: 1,
        flexDirection: 'column'
    },
    iosStatusBar: {
        backgroundColor: '#rgba(255, 255, 255, 1.0)',
        height: (Platform.OS === 'ios' ? 20 : 0)
    },
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    optionBar: {
        width: 75,
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#423630'
    },
    contents: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#ffffff'
    },
    controllButtons: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 5

    },
    closeButton: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#ee6b60'
    },
    minimizeButton: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#F6BF50'
    },
    maximizeButton: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#65C957'
    },
    homeTabIcon: {
        width: 36,
        height: 36,
        marginTop: 40
    },
    mailTabIcon: {
        width: 36,
        height: 36,
        marginTop: 30
    },
    moreTabIcon: {
        width: 36,
        height: 36,
        marginTop: 30
    },
    bottomTabs: {
        flexDirection: 'column',
        marginBottom: 30
    },
    noticeTabIcon: {
        width: 24,
        height: 24
    },
    settingTabIcon: {
        width: 24,
        height: 24,
        marginTop: 20
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15
    },
    headerTitle: {
        color: '#2a2a2a',
        fontSize: 18,
        fontWeight: 'bold'
    },
    addIcon: {
        width: 24,
        height: 24
    },
    headerLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#efeff4'
    },
    searchBar: {
        height: 36,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#9b9b9b',
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        color: '#2a2a2a',
        fontSize: 14,
        paddingLeft: 10,
        paddingRight: 10
    },
    searchLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#efeff4',
        marginTop: 10
    },
    channelList: {
        flex: 1,
        width: '100%'
    },
    flexDummy: {
        flex: 1
    }
});