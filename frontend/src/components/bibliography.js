import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { fetchData } from '../http.service'
import ReactPaginate from 'react-paginate'

class Bibliography extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bibliographies: [],
      pageNo: 1,
      isLoading: true
    }
  }

  componentWillMount() {
    fetchData('/bibliography/1').then(data => {
      this.setState({ bibliographies: data.content, isLoading: false })
    })
  }

  _loadPage = (page) => {
    fetchData(`/bibliography/${page.selected}`).then(data => {
      this.setState({ bibliographies: data.content, isLoading: false })
    })
  }

  render() {
    const { bibliographies, pageNo } = this.state
    // console.log(bibliographies[0])
    return (
      <div>
        <Helmet>
          <title>Bibliography - Atnumis</title>
        </Helmet>
        <div className='page cf'>
          <div id='system-message-container' />

          <div className='artists-directory-holder'>
            <div className='page-title'>
              <h1>Bibliography</h1>
            </div>

            {/* <div className="alphabets artists-directory__refine">
              <div className="searchdiv">
                <p>Search Publications</p>
                <input type="text" name="search" id="search" defaultValue="" />
                <button name="find" id="find" value="Find">
                  Find
                </button>
              </div>

              <div className="alphabets-range artists-directory__refine__range">
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=A"
                  className="alphabet "
                  data-value="A"
                >
                  A
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=B"
                  className="alphabet "
                  data-value="B"
                >
                  B
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=C"
                  className="alphabet "
                  data-value="C"
                >
                  C
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=D"
                  className="alphabet "
                  data-value="D"
                >
                  D
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=E"
                  className="alphabet "
                  data-value="E"
                >
                  E
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=F"
                  className="alphabet "
                  data-value="F"
                >
                  F
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=G"
                  className="alphabet "
                  data-value="G"
                >
                  G
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=H"
                  className="alphabet "
                  data-value="H"
                >
                  H
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=I"
                  className="alphabet "
                  data-value="I"
                >
                  I
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=J"
                  className="alphabet "
                  data-value="J"
                >
                  J
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=K"
                  className="alphabet "
                  data-value="K"
                >
                  K
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=L"
                  className="alphabet "
                  data-value="L"
                >
                  L
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=M"
                  className="alphabet "
                  data-value="M"
                >
                  M
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=N"
                  className="alphabet "
                  data-value="N"
                >
                  N
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=O"
                  className="alphabet "
                  data-value="O"
                >
                  O
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=P"
                  className="alphabet "
                  data-value="P"
                >
                  P
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=Q"
                  className="alphabet "
                  data-value="Q"
                >
                  Q
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=R"
                  className="alphabet "
                  data-value="R"
                >
                  R
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=S"
                  className="alphabet "
                  data-value="S"
                >
                  S
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=T"
                  className="alphabet "
                  data-value="T"
                >
                  T
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=U"
                  className="alphabet "
                  data-value="U"
                >
                  U
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=V"
                  className="alphabet "
                  data-value="V"
                >
                  V
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=W"
                  className="alphabet "
                  data-value="W"
                >
                  W
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=X"
                  className="alphabet "
                  data-value="X"
                >
                  X
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=Y"
                  className="alphabet "
                  data-value="Y"
                >
                  Y
                </a>
                <a
                  href="https://www.romanumismatics.com/index.php?option=com_bibliography&amp;task=getBibliography&amp;alphabet=Z"
                  className="alphabet "
                  data-value="Z"
                >
                  Z
                </a>
              </div>
            </div> */}

            <div
              id='artistdirectory-artistdirectory'
              className='artists-directory__list'
              style={{margin:'0px auto'}}
            >
              <div className='pagination artists-directory__pag' >
                <ReactPaginate
                  initialPage={1}
                  pageCount={28}
                  pageRangeDisplayed={10}
                  marginPagesDisplayed={5}
                  containerClassName='pagination'
                  pageLinkClassName='paginate mr-1 ml-1'
                  breakClassName='mr-1 ml-1'
                  pageClassName='page-item'
                  activeClassName='active'
                  activeLinkClassName='active'
                  onPageChange={(page) => {this._loadPage(page)}}
                />
              </div>
            
              <div className='header-columns'>
                <div className='reference-column'>
                  <p>Reference</p>
                </div>
                <div className='publication-column'>
                  <p>Publication</p>
                </div>
              </div>
              <ul className='bibliography-list'>
                {bibliographies.map((bibliography, i) => {
                  return (
                    <li key={i} className='bibliography-item'>
                      <div className='reference-column'>
                        <p>{bibliography.reference}</p>
                      </div>
                      <div className='publication-column'>
                        <p>{bibliography.publication}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div
              id='artistdirectory-artistdirectory'
              className='artists-directory__list'
              style={{margin:'0px auto'}}
            >
              <div className='pagination artists-directory__pag' >
                <ReactPaginate
                  initialPage={1}
                  pageCount={28}
                  pageRangeDisplayed={10}
                  marginPagesDisplayed={5}
                  containerClassName='pagination'
                  pageLinkClassName='paginate mr-1 ml-1'
                  breakClassName='mr-3'
                  pageClassName='page-item'
                  activeClassName='active'
                  activeLinkClassName='active'
                  onPageChange={(page) => {this._loadPage(page)}}
                />
              </div>
              </div>

         
          </div>

          <div className='padded-inner ' />
        </div>
      </div>
    )
  }
}

export default Bibliography
