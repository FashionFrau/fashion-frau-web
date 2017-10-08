import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { fetchLooks, deleteLook } from '../actions'
import Gallery from 'react-photo-gallery'
import Measure from 'react-measure';
import { debounce } from '../utils';

class LookList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      list: [],
      count: 0,
      totalCount: 1,
      pageNum: 1,
      loadedAll: false
    };

    this.props.dispatch(fetchLooks());

    this.renderLooks = this.renderLooks.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);

    this.handleScroll = this.handleScroll.bind(this);
    this.loadMorePhotos = this.loadMorePhotos.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { looks } = nextProps;
    const { errorMessage, data, totalCount } = looks

    if(errorMessage) {
      this.setState({ errorMessage: errorMessage })
    } else {

      const count = this.state.list.length + data.length

      this.setState({
        list: this.state.list ? this.state.list.concat(data) : list,
        count: count,
        totalCount: totalCount,
        pageNum: this.state.pageNum + 1,
        loadedAll: count >= totalCount
      })
    }
  }

  componentDidMount() {
    this.loadMorePhotos();
    this.loadMorePhotos = debounce(this.loadMorePhotos, 200);
    window.addEventListener('scroll', this.handleScroll);
  }

  /****************************************************************************/
  /********************************* Layout ***********************************/
  /****************************************************************************/

  handleScroll() {
    let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    if (window.innerHeight + scrollY >= document.body.offsetHeight - 50) {
      this.loadMorePhotos();
    }
  }

  loadMorePhotos(e) {
    if (e) {
      e.preventDefault();
    }
    if (this.state.count > this.state.totalCount) {
      this.setState({ loadedAll: true });
      return;
    }

    const urlParams = {
      per_page: '10',
      page: this.state.pageNum,
    };

    this.props.dispatch(fetchLooks(urlParams));
  }

  /********************************* Look *************************************/

  onDeleteClick(event, obj) {
    const { photo: { id } } = obj

    this.props.dispatch(deleteLook(id, () => {
      this.props.history.push("/");
    }));
  }

/********************************* Error **************************************/

  renderErrorMessage() {
    return (
      <p style={{ backgroundColor: '#e99', padding: 10, color: 'white' }}>
        <b>{this.state.errorMessage}</b>
      </p>
    )
  }

/********************************* No data ************************************/

  renderEmpty() {
      return(
        <div className="jumbotron">
          <h2 className="text-center">No results</h2>
        </div>
      )
  }

/********************************* Looks **************************************/
  renderLooks() {

    return(
      <Gallery
        photos={this.state.list}
        margin={5}
      />
    )
  }

  render() {
    if(this.state.errorMessage) {
      return(
        <div>
            {this.renderErrorMessage()}
        </div>
      );
    }

    if(this.state.list.length === 0){
      return(
        <div>
          {this.renderEmpty()}
        </div>
      )
    }

    return (
      <div>
        <div className="text-center ff-title">Looks</div>
          {this.renderLooks()}
          {!this.state.loadedAll && (
            <div className="loading-msg" id="msg-loading-more">
              Loading
            </div>
          )}
      </div>
    );
  }
}

function mapStateToProps({ looks }) {
  return { looks };
}

export default connect(mapStateToProps)(LookList);
