var React = require('react');
var reactRedux = require('react-redux')
require("./my_cms_tree.css");
require("./test.scss");
var Redux=require("redux");
var actions=require("../../cms/my_cms/redux/actions.js");
var reactRouter=require('react-router');
//import reactRouter from 'react-router';
//import { Link } from 'react-router';
var connect=reactRedux.connect,provider =reactRedux.Provider,Link=reactRouter.Link;



//getInitialState()
//getDefaultProps()
//propTypes
//mixins
//statics
//componentWillMount()
//componentDidMount()
//componentWillReceiveProps(object nextProps)
//shouldComponentUpdate(object nextProps, object nextState)
//componentWillUpdate(object nextProps, object nextState)
//componentDidUpdate(object prevProps, object prevState)
//componentWillUnmount()
//component.forceUpdate()



var Tree = React.createClass({

    createTree:function(data,itemClick){
        var treeEntity=this.treeEntity,r='', self=this.createTree;
        return data.map(function(item,index){

            var lic="position_r item closed ";//+item.text;

            if(item.child){

                return(<li className={lic} key={item.value}>
                    <a  data-path={item.value}  onClick= {itemClick.bind(this)} >{item.text}</a>
                    <ul  className="items position_r "  style={{display:'none'}}>
                 {self(item.child,itemClick)}
                    </ul>
                </li>)
            }
            else{
                return (<li className={lic} key={item.value}>
                    <a id={item.text} data-path={item.value} data-isfile={item.isFile}      onClick= {itemClick.bind(this)}>{item.text}</a>
                </li>)
            }
        })
    },
    itemClick:function(e){
        var ul=$(e.target).parent().children("ul");
        if( ul.children().length>0){
            ul.toggle(100);
            var t=ul.parent();
            t.hasClass("closed")?t.removeClass("closed").addClass("expand"):t.removeClass("expand").addClass("closed");

        }else{
        }
        this.props.onItemClick($(e.target).attr("data-path"),$(e.target).attr("data-isfile"),this.props.tabType);
    },

    componentDidMount() {
    this.props.getFileInfo();

        //this.props.router.setRouteLeaveHook(
        //    this.props.route,
        //    this.routerWillLeave
        //)
    },
    routerWillLeave(nextLocation) {
      //  alert(3);
        // 返回 false 会继续停留当前页面，
        // 否则，返回一个字符串，会显示给用户，让其自己决定
        //if (true)
        //    return '确认要离开？';
    },

    render: function () {
        var d=this.props.itemData;

        var itemClick=this.itemClick;
        var treehtml=this.createTree(d,itemClick);
        return (
            <div  id="treeCon">

                <div  id="tree" >
                    <div className="tree position_r" >
                        <ul className="items position_r">
                    {treehtml}
                        </ul>
                    </div>
                </div>
            </div>


        );
    }
});



const mapStateToProps =function (state) {
    return {
        itemData:state.treeCounter.treeItems
        ,options:state.treeCounter.options
        ,state:state.treeCounter.state
        ,content:state.treeCounter.content
        ,currentcontent:state.treeCounter.currenttxt
        ,tabType:state.tabCounter.tab.tabType

    }
}

const mapDispatchToProps = function(dispatch ,ownProps) {
    return {
        onItemClick: function(path,isFile,tabType){

            isFile&&dispatch(actions.getFileContent(path,1));
            //tabType==0&&isFile&&dispatch(actions.getFileContent(path,1));
            //tabType==1&&dispatch({type:"showFolder",path:path});
            dispatch({type:"showFolder",path:path});
        }
        ,getFileInfo:function(){
            dispatch(actions.getFileInfo({pathType:1}));
        }
    }
}

var Tree=connect(
    mapStateToProps,
    mapDispatchToProps
)(Tree);
module.exports =Tree;
