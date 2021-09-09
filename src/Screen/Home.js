import React from 'react';
import axios from 'axios';
import IIcon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Alert, View, AsyncStorage, StyleSheet, Image, Text, TextInput, ActivityIndicator,
    TouchableOpacity,
    ImageBackground,
    RefreshControl
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { width, height, RATIO, FONT } from '../lib/utils';
import { Container, Picker, Switch } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import CustomHeader from '../lib/components/CustomHeader';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            loaded: false,
            reqSearch: '',
            reqPage: 1,
            loadMore: true,
            dataCount: 0
        }
    }

    fetchData() {
        let url = `https://swapi.dev/api/people/?page=${this.state.reqPage}&search=${this.state.reqSearch}`;
        return (
            axios.get(url)
                .then((response) => {
                    const dataReturn = {
                        status: response.status,
                        object: response.data
                    }
                    return dataReturn
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        )
    }

    async loadData() {
        const results = await this.fetchData();

        if (results) {
            this.setState({ loaded: true, dataSource: results.object.results, dataCount: results.object.count })
        }
    }

    async componentDidMount() {
        await this.loadData();
    }

    async handleDetails(reqUrl) {
        Actions.details({ url: reqUrl })
    }

    _onRefresh = async () => {
        this.setState({
            refreshing: true,
            loaded: false,
            reqPage: await 1
        });
        await this.loadData()
        this.setState({ refreshing: false })
    }

    renderEmpty = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', height: height * 0.5 }}>
                <MCIcon name="file-alert-outline" size={20} color="#979797" />
                <Text style={{ fontSize: 20, color: '#979797' }}>
                    Data Empty
                </Text>
            </View>
        )
    }

    async handleLoadMore() {
        this.setState({ loadMore: false });
        await this.setState(prevState => ({ reqPage: prevState.reqPage + 1 }));
        const results = await this.fetchData();
        let objRes = await results.object.results
        let joined = this.state.dataSource.concat(objRes);
        this.setState({ dataSource: joined, loadMore: await true })
    }

    async handleSearch() {
        const results = await this.fetchData();
        this.setState({ loaded: false});
        if (results) {
            this.setState({ loaded: true, dataSource: results.object.results, dataCount: results.object.count })
        }
    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => Actions.detailsPage({url: item.url})} key={index} style={{ padding: 10, borderBottomColor: '#eee', borderBottomWidth: 1 }} >
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '80%' }}>
                        <Text>{item.name}</Text>
                    </View>
                    <View style={{ width: '20%', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <IIcon name="chevron-forward" />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { loaded, dataSource, loadMore, dataCount } = this.state;
        return (
            <Container>
                <CustomHeader
                    left=""
                    onLeft=""
                    center={"Home"}
                    right=""
                    onRight=""
                />
                {
                    loaded ?
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh}
                                />
                            }
                            ListHeaderComponent={
                                <View>
                                    <TextInput
                                        label=""
                                        style={[styles.input]}
                                        blurOnSubmit={true}
                                        onChangeText={(text) => this.setState({ reqSearch: text, reqPage: '' })}
                                        placeholder={'Search...'}
                                        underlineColorAndroid="transparent"
                                        placeholderTextColor="rgba(0,0,0,0.54)"
                                        value={this.state.reqSearch}
                                        selectionColor="#000"
                                        onBlur={() => this.handleSearch()}
                                    />
                                </View>
                            }
                            data={dataSource}
                            showsVerticalScrollIndicator={false}
                            renderItem={this.renderItem}
                            keyExtractor={(s, i) => i.toString()}
                            ListEmptyComponent={() => this.renderEmpty()}
                            style={{ marginBottom: 50, padding: 20 }}
                            ListFooterComponent={
                                <View style={{ height: 50 }}></View>
                            }
                        />
                        :
                        <View style={{ height: height * 0.9, width: '100%' }}>
                            <ActivityIndicator size="large" color="#0996ff" style={{
                                height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'
                            }}
                            />
                        </View>
                }
                <View style={{ position: 'absolute', bottom: 20, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    {
                        loadMore ?
                            dataSource.length < dataCount &&
                            <TouchableOpacity onPress={() => this.handleLoadMore()} style={{ width: '30%' }}>
                                <Text style={{ padding: 10, backgroundColor: '#0996ff', borderRadius: 50, color: '#fff', textAlign: 'center' }}>Load More...</Text>
                            </TouchableOpacity>
                            :
                            <View style={{ width: '30%' }}>
                                <ActivityIndicator size="small" color="#0996ff" style={{
                                    height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'
                                }}
                                />
                            </View>
                    }
                </View>
            </Container>
        )
    }

}
const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        color: '#424242',
        padding: 3,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        marginBottom: 10
    },
})

export default HomePage