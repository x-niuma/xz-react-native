import React from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Carousel } from '@ant-design/react-native';

import api from '../api';
import Util from '../util/Util';
import ViewUtil from '../util/ViewUtil';
import NavigationBar from '../common/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommentItem from '../bizCommon/CommentItem';
import CommentTalk from '../bizCommon/CommentTalk';

const deviceWidth = Util.gWidth;

/**
 * @description 闲置商品详情页面
 * @author Gaollard
 */
export default class XzProduct extends React.Component {
  state = {
    curSwiperIndex: 0,
    productInfo: null,
    commentList: [],
    isLiked: false,
    likeInfo: {},
    collectInfo: {},
    isCollected: false,
    commentTalkVisible: false,
    commentParent: null,
    fix_bottom: 0,
    opacity: new Animated.Value(0)
  };

  onHorizontalSelectedIndexChange = async (index) => {
    this.setState({ curSwiperIndex: index })
  };

  componentDidMount() {
    const { productId } = this.props.navigation.state.params;
    api.getXzProductDetail(productId).then(res => {
      if (res.success) {
        this.setState({ productInfo: res.data });
      }
    });
    this._getCommentList();
    this._doGetCollectState({ typeId: '1' });
    this._doGetCollectState({ typeId: '2' });
  }

  _handleToggle = (typeId) => {
    if (typeId === '2') {
      if (this.state.isLiked) {
        this._doRemoveCollect({ typeId, recordId: this.state.likeInfo.id })
      } else {
        this._handleAddCollect({ typeId })
      }
    }
    if (typeId === '1') {
      if (this.state.isCollected) {
        this._doRemoveCollect({ typeId,  recordId: this.state.collectInfo.id })
      } else {
        this._handleAddCollect({ typeId })
      }
    }
  };

  // 增加喜欢或删除喜欢
  _handleAddCollect = ({ typeId }) => {
    const { productId } = this.props.navigation.state.params;
    api.addCollect({
      itemId: productId,
      typeId: typeId
    }).then(res => {
      this._doGetCollectState({ typeId });
    })
  };

  // 删除点赞/收藏
  _doRemoveCollect = ({ recordId, typeId }) => {
    api.removeCollect({
      recordId: recordId
    }).then(res => {
      this._doGetCollectState({ typeId });
    }).catch(err => {
      alert('删除失败' + err);
    })
  };

  // 获取收藏或点赞状态
  _doGetCollectState = ({ typeId }) => {
    const { productId } = this.props.navigation.state.params;
    api.getCollectState({
      itemId: productId,
      typeId: typeId, // 1 typeId = 2 表示点赞 typeId = 1 表示搜藏
    }).then(res => {
      if (typeId === '2') {
        this.setState({
          isLiked: !!res.data.status,
          likeInfo: res.data
        });
      }
      if (typeId === '1') {
        this.setState({
          isCollected: !!res.data.status,
          collectInfo: res.data
        });
      }
    })
  };

  // 获取商品评论
  _getCommentList = () => {
    const { productId } = this.props.navigation.state.params;
    api.getCommentList(productId).then(res => {
      if (res.success) {
        this.setState({ commentList: res.data.list || [] });
      }
    })
  };

  // 评论列表
  _renderCommentList = () => {
    const commentList = this.state.commentList.slice(-5);
    if (!commentList.length) return <Text>暂无评论</Text>;
    return commentList.map((item, index) => {
      return (
        <CommentItem
          commentInfo={item}
          key={`comment_${index}`}
          onClickReply={(v) => this._handleReply(v)}
          childCommentList={
          item.children.slice(0, 5).map((childItem, childIndex) => {
            return (
              <CommentItem
                commentInfo={childItem}
                key={`comment_${index}_${childIndex}`}
                showAt={true}
                talker={item.userInfo}
                onClickReply={(v) => this._handleReply({...v, parentId: item.id})}
              />
            )
          })
        }/>
      )
    });
  };

  _renderProductInfo = () => {
    if (!this.state.productInfo) return null;
    const { productInfo } = this.state;
    const author  = productInfo.user || {};
    const imgList = this.state.productInfo.imgs;
    return (
      <View>
        <Carousel
          selectedIndex={this.state.curSwiperIndex}
          autoplay
          infinite
          afterChange={this.onHorizontalSelectedIndexChange}
          dotStyle={styles.dotStyle}
          dotActiveStyle={styles.dotActiveStyle}>
          {
            imgList.map((slide, index) => {
              return (
                <View style={[styles.containerHorizontal]} key={index}>
                  <Image source={{ uri: 'http:' + slide }} style={styles.slide_img}/>
                </View>
              )
            })
          }
        </Carousel>
        <View style={{
          paddingHorizontal: 12,
          backgroundColor: '#fff',
          paddingBottom: 10
        }}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 10,
          }}>
            <Text style={{ fontSize: 16 }}>{ productInfo.title }</Text>
            <Text style={{ color: '#ff5722', fontSize: 16 }}>{ productInfo.price }</Text>
          </View>
          <View style={{ paddingTop: 10 }}>
            <Text style={{ color: '#666' }}>{ productInfo.description }</Text>
          </View>
        </View>

        <View style={{ height: 10 }}/>

        <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 12 }}>
          <Image style={{ width: 50, height: 50, marginRight: 12 }} source={{ url: author.avatar }}/>
          <View>
            <Text>{ author.nickname }</Text>
            <Text style={{ marginTop: 10, color: '#666' }}>{ author.residence }</Text>
          </View>
        </View>

        <View style={{ height: 10 }}/>

        <View style={{ backgroundColor: '#fff' }}>
          <View style={{ borderColor: '#ccc', borderBottomWidth: .5  }}>
            <Text style={{ paddingHorizontal: 12, height: 44, lineHeight: 44 }}>留言</Text>
          </View>
          {this._renderCommentList()}
        </View>
      </View>
    )
  };

  _handleComment = () => {
    this.setState({
      commentParent: null,
      commentTalkVisible: true,
    })
  };

  _handleReply = (data) => {
    this.setState({
      commentParent: data,
      commentTalkVisible: true,
    })
  };

  _doAddComment = (content) => {
    if (!content) return alert('评论内容不能为空');
    if (!this.state.commentParent) {
      // 顶层评论
      const { productId } = this.props.navigation.state.params;
      api.addComment({
        itemId: productId,
        typeId: '1',
        content,
        parentId: 0,
        talkTo: 2
      }).then(res => {
        this._getCommentList();
      })
    } else {
      // 字评论
      const { productId } = this.props.navigation.state.params;
      const { commentParent } = this.state;
      api.addComment({
        itemId: productId,
        typeId: '2',
        content,
        parentId: commentParent.id,
        talkTo: commentParent.uid
      }).then(res => {
        this._getCommentList();
      })
    }
  };

  _renderFooter = () => {
    const { isCollected, isLiked, commentTalkVisible } = this.state;
    const toChat = () => this.props.navigation.push('Chat', {userId: ''});
    if (commentTalkVisible) {
      return (
        <View style={[
          {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopWidth: .5,
            borderColor: '#f5f5f5'
          },
          {
            position: 'absolute',
            bottom: this.state.fix_bottom,
            backgroundColor: '#fff',
            borderWidth: .5
          }
        ]}>
          <CommentTalk
            autoFocus={true}
            onBlur={() => {
              this.setState({
                fix_bottom: 0,
                commentTalkVisible: false
              })
            }}
            onSubmit={val => this._doAddComment(val)}
            onFocus={(keyboardHeight) => this.setState({ fix_bottom: keyboardHeight })}
          />
        </View>
      )
    }
    if (!commentTalkVisible) {
      return (
        <View style={styles.footer}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={styles.footer_action_btn}>
              <FontAwesome name="star-o" size={18} style={{color: isLiked ? 'red': '#333'}}/>
              <Text onPress={() => this._handleToggle('2')} style={[styles.footer_action_text, {color: isLiked ? 'red': '#333'}]}>点赞</Text>
            </View>
            <View style={styles.footer_action_btn}>
              <FontAwesome name="thumbs-o-up" size={18} style={{color: isCollected ? 'red': '#333'}}/>
              <Text onPress={() => this._handleToggle('1')} style={[styles.footer_action_text, {color: isCollected ? 'red': '#333'}]}>收藏</Text>
            </View>
            <View style={styles.footer_action_btn}>
              <AntDesign name="message1" size={18}/>
              <Text onPress={this._handleComment} style={styles.footer_action_text}>留言</Text>
            </View>
          </View>
          <View style={styles.footer_active_btn}>
            <Text style={styles.footer_msg_btn} onPress={toChat}>我想要</Text>
          </View>
        </View>
      )
    }
  };

  _handleBack = () => {
    this.props.navigation.goBack();
  };

  _handleShare = () => {
    alert('分享按钮');
  };

  _handleClickMenu = () => {
    alert('菜单按钮');
  };

  render() {
    const iconColor = 'rgba(0, 0, 0, .4)';
    return (
      <View style={styles.wrapper}>
        {/*顶部悬浮*/}
        <View style={styles.fix_header} ref={ref => this.navBar = ref}>
          <AntDesign onPress={this._handleBack}  name="left" size={24} color="#333"/>
          <Text style={{ fontSize: 18 }}>{this.state.productInfo ? this.state.productInfo.title : ''}</Text>
          <AntDesign onPress={this._handleClickMenu}  name="sharealt" size={24} color="#333"/>
        </View>

        {/*滑动悬浮*/}
        <View ref={ref => this.shortNav = ref} style={styles.scroll_nav}>
          <AntDesign onPress={this._handleBack}  name="leftcircle" size={30} color={iconColor}/>
          <View style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <View style={styles.ellipsis_btn}>
              <AntDesign onPress={this._handleShare}  name="sharealt" size={18} color="#fff"/>
            </View>
            <View style={styles.ellipsis_btn}>
              <AntDesign onPress={this._handleClickMenu}  name="ellipsis1" size={24} color="#fff"/>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.body}
          scrollEventThrottle={1}
          onScroll={(event) => {
          let y = event.nativeEvent.contentOffset.y;
          let opacityPercent = (y - 100) / 120;
          if (y > 100) {
            this.shortNav.setNativeProps({ style: {opacity: 0}});
            this.navBar.setNativeProps({style: {opacity: opacityPercent}})
          } else {
            this.shortNav.setNativeProps({style: {opacity: 1}});
            this.navBar.setNativeProps({style: {opacity: opacityPercent}})
          }
        }}>
          { this._renderProductInfo() }
        </ScrollView>
        {this._renderFooter()}
      </View>
    )
  }
}

const gray_color = '#999';
const styles = StyleSheet.create({
  gray_color: {
    color: gray_color,
  },
  active_color: {
    color: 'red'
  },
  wrapper: {
    position: 'relative',
    flex: 1,
    width: deviceWidth,
    display: 'flex',
  },
  body: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  navigationBarStyle: {
    zIndex: 2,
    position: 'absolute',
    top: 30,
    color: '#333',
    backgroundColor: '#fff'
  },
  slide_img: {
    height: 300,
    width: deviceWidth
  },

  // 顶部悬浮
  fix_header: {
    zIndex: 5,
    position: 'absolute',
    paddingTop: 42,
    height: 86,
    width: deviceWidth,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: 0
  },
  ellipsis_btn: {
    marginLeft: 12,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 30,
    height: 30,
    padding: 2,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, .4)'
  },
  scroll_nav: {
    zIndex: 10,
    position: 'absolute',
    paddingHorizontal: 12,
    top: 48,
    width: deviceWidth,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  // 底部悬浮
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    paddingBottom: 30,
    paddingHorizontal: 12,
    borderTopWidth: .5,
    borderColor: '#f5f5f5'
  },
  footer__fixed: {
    // position: 'absolute',
    // bottom: fix_bottom
  },
  footer_action_btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  footer_action_text: {
    fontSize: 14,
    marginLeft: 6,
  },
  footer_active_btn: {
    borderRadius: 2,
    backgroundColor: '#ff5722',
  },
  footer_msg_btn: {
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 6,
    color: '#fff'
  },
});