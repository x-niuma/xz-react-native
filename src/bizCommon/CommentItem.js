import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class CommentItem extends Component {
  constructor(props){
    super(props)
  }

  _handleReply = (data) => {
    this.props.onClickReply && this.props.onClickReply(data);
  };

  render(){
    const item = this.props.commentInfo;
    const author = item.userInfo || {};
    const showAt = this.props.showAt;
    const talker = this.props.talker || {};
    return (
      <View style={styles.comment_item}>
        <View style={styles.comment_header}>
          <Image style={styles.comment_avatar} source={{ url: author.avatar }}/>
          <View>
            <Text>{ author.nickname || author.mobile }</Text>
            <Text style={[styles.gray_color, {marginTop: 8, fontSize: 12}]}>{ item.create_time }</Text>
          </View>
          <Text style={styles.comment_reply} onPress={() => this._handleReply(item)}>回复</Text>
        </View>
        <View style={styles.comment_body}>
          <Text style={[styles.comment_content, styles.gray_color]}>
            {
              showAt ? (
                <Text style={[active_color]}>
                  <Text>回复@</Text>
                  <Text style={styles.active_color}>{talker.nickname}</Text>
                  <Text>&nbsp;&nbsp;</Text>
                </Text>
              ) : null
            }
            <Text>{item.content}</Text>
          </Text>
        </View>
        <View style={styles.child_comment}>
          {this.props.childCommentList}
        </View>
      </View>
    )
  }
}

const gray_color = '#222';
const active_color = '#03a9f4';
const styles = StyleSheet.create({
  gray_color: {
    color: gray_color,
  },
  active_color: {
    color: active_color
  },
  // 评论模块
  comment_item: {
    position: 'relative',
    backgroundColor: '#fff',
  },
  comment_header: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderColor: '#f5f5f5',
  },
  comment_body: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 50,
    paddingTop: 6,
    paddingBottom: 16,
    borderColor: '#f5f5f5',
    borderBottomWidth: .5
  },
  comment_content: {
    // backgroundColor: 'red'
  },
  comment_reply: {
    position: 'absolute',
    right: 16,
    top: 16
  },
  comment_avatar: {
    width: 32,
    height: 32,
    borderRadius: 4,
    marginRight: 8
  },
  child_comment: {
    paddingLeft: 30
  },
  talker_name: {
    marginRight: 20,
    color: gray_color
  }
});