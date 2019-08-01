import React, { PureComponent } from 'react';
import RightContent from '../GlobalHeader/RightContent';
import BaseMenu from '../SiderMenu/BaseMenu';
import { getFlatMenuKeys } from '../SiderMenu/SiderMenuUtils';
import studentLogo from '../../assets/studentLogo.png'
import teacherLogo from '../../assets/teacherLogo.png'
import rootLogo from '../../assets/rootLogo.png'
import styles from './index.less';

class TopNavHeader extends PureComponent {
  state = {
    maxWidth: undefined,
  };

  static getDerivedStateFromProps(props) {
    return {
      maxWidth: (props.contentWidth === 'Fixed' ? 1200 : window.innerWidth) - 280 - 165 - 40,
    };
  }

  render() {
    const { theme, contentWidth, menuData, currentUser } = this.props;
    const { maxWidth } = this.state;
    const flatMenuKeys = getFlatMenuKeys(menuData);
    console.log("index", currentUser);
    return (
      <div className={`${styles.head} ${theme === 'light' ? styles.light : ''}`}>
        <div
          ref={ref => {
            this.maim = ref;
          }}
          className={`${styles.main} ${contentWidth === 'Fixed' ? styles.wide : ''}`}
        >
          <div className={styles.left}>
            <div className={styles.logo} key="logo" id="logo">
              {
                currentUser.username === undefined ? '' : (
                  <div>
                    {
                      currentUser.username.length === 12 ? <img src={studentLogo} style={{ height: 60 }} alt="logo" /> : (
                        <div>
                          {
                            currentUser.username.length === 5 ? <img src={teacherLogo} style={{ height: 60 }} alt="logo" /> : <img src={rootLogo} style={{ height: 60 }} alt="logo" />
                          }
                        </div>
                      )
                    }
                  </div>
                )
              }
            </div>
            <div
              style={{
                maxWidth,
              }}
            >
              <BaseMenu {...this.props} flatMenuKeys={flatMenuKeys} className={styles.menu} />
            </div>
          </div>
          <RightContent {...this.props} />
        </div>
      </div>
    );
  }
}

export default TopNavHeader;
