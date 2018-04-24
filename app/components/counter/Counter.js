// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { CounterAction } from '../../actions';

type Props = {
    style?: Object,
    CounterAction: Object
};

type State = {
};

export default class Counter extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>

                <TouchableOpacity
                    style={styles.plusButton}
                    activeOpacity={0.7}
                    onPress={() => {
                        this.props.CounterAction.countUp(1)
                    }} >

                    <Text style={styles.font} >
                        {'+1'}
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.plusButton, styles.buttonMarginLeft]}
                    activeOpacity={0.7}
                    onPress={() => {
                        this.props.CounterAction.countUp(2)
                    }} >

                    <Text style={styles.font} >
                        {'+2'}
                    </Text>

                </TouchableOpacity>

                <Text style={[styles.count, styles.font]} >
                    {'0'}
                </Text>

                <TouchableOpacity
                    style={[styles.minusButton, styles.buttonMarginRight]}
                    activeOpacity={0.7}
                    onPress={() => {
                        this.props.CounterAction.countDown(-1)
                    }} >

                    <Text style={styles.font} >
                        {'-1'}
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.minusButton}
                    activeOpacity={0.7}
                    onPress={() => {
                        this.props.CounterAction.countDown(-2)
                    }} >

                    <Text style={styles.font} >
                        {'-2'}
                    </Text>

                </TouchableOpacity>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    count: {
        width: 48,
        height: 48,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    plusButton: {
        width: 48,
        height: 48,
        backgroundColor: 'cyan',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    minusButton: {
        width: 48,
        height: 48,
        backgroundColor: 'pink',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    font: {
        color: "#2a2a2a",
        fontSize: 20,
    },
    buttonMarginLeft: {
        marginLeft: 10
    },
    buttonMarginRight: {
        marginRight: 10
    }
});