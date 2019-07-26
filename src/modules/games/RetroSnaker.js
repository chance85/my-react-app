import React, { Component, Fragment } from 'react'
import './RetroSnaker.css'

/**
 * 贪吃蛇
 * 原理: 蛇的身体由每一个小方块组成, 每一个方块都有其自己的x y轴坐标, 渲染这些坐标便将蛇渲染出来
 * 移动: 数据中的最后一个数据为蛇的头部, 每次移动时, 删除数据的第一个数据, 并在最后一个添加一个数据, 这样蛇便就在移动了
 * 食物: 判断蛇是否吃到食物只需判断蛇头的x y坐标是否等于食物的坐标, 然后在蛇的数据数组首位添加一组数据, 且等于未吃到食物时的第一数据
 * 问题: 导致蛇在吃到食物时并没有立即边长(因为第一与第二个数据重叠了), 而是在走下一步时变长了(效果看移动)
 */

class RetroSnaker extends Component {
  constructor(props) {
    super(props)
    this.time_left = -1
    this.time_right = -1
    this.time_top = -1
    this.time_down = -1
    this.state = {
      snakes: [
        { x: 0, y: 0, color: 'red' },
        { x: 1, y: 0, color: 'red' },
        { x: 2, y: 0, color: 'red' }
      ],
      food: [],
      speed: 0
    }
    this.handleStop = this.handleStop.bind(this)
  }

  componentDidMount() {
    this.setState({
      food: [
        {
          x: Math.floor(Math.random() * 40),
          y: Math.floor(Math.random() * 40),
          color: `#${Math.floor(Math.random() * 1000000)}`
        }
      ],
      speed: 300
    })
  }

  componentWillUnmount() {
    // 组件注销时清除按键事件
    document.removeEventListener('keydown', this.onKeyDown)
  }

  handleMoving() {
    // 注册按键事件
    document.addEventListener('keydown', this.onKeyDown)
    this.setState({
      snakes: [
        { x: 0, y: 0, color: 'red' },
        { x: 1, y: 0, color: 'red' },
        { x: 2, y: 0, color: 'red' }
      ],
      food: [
        {
          x: Math.floor(Math.random() * 40),
          y: Math.floor(Math.random() * 40),
          color: `#${Math.floor(Math.random() * 1000000)}`
        }
      ]
    })
  }

  // 全局按键按下事件
  onKeyDown = e => {
    // 左37 上38 右39 下40
    // 当前元素与已定位父元素的距离 offsetLeft 左边距离 offsetTop 上边距离
    let snakes = JSON.parse(JSON.stringify(this.state.snakes))

    switch (e.keyCode) {
      // 左
      case 37:
        clearInterval(this.time_left)
        clearInterval(this.time_right)
        clearInterval(this.time_top)
        clearInterval(this.time_down)
        this.time_left = setInterval(() => {
          // 吃到自己 游戏结束
          for (let i = 0; i < snakes.length - 1; i++) {
            if (
              snakes[snakes.length - 1].x === snakes[i].x &&
              snakes[snakes.length - 1].y === snakes[i].y
            ) {
              this.handleStop()
            }
          }

          snakes = JSON.parse(JSON.stringify(this.state.snakes))
          // 替换首尾 === 移动
          snakes.shift()
          snakes.push({
            x: snakes[snakes.length - 1].x - 1,
            y: snakes[snakes.length - 1].y,
            color: 'red'
          })
          this.setState(
            () => ({
              snakes
            }),
            () => {
              this.isGetFood()
              // 撞墙 游戏结束
              if (this.state.snakes[this.state.snakes.length - 1].x < 0) {
                this.handleStop()
              }
            }
          )
        }, this.state.speed)
        break

      // 上
      case 38:
        clearInterval(this.time_left)
        clearInterval(this.time_right)
        clearInterval(this.time_top)
        clearInterval(this.time_down)
        this.time_top = setInterval(() => {
          // 吃到自己 游戏结束
          for (let i = 0; i < snakes.length - 1; i++) {
            if (
              snakes[snakes.length - 1].x === snakes[i].x &&
              snakes[snakes.length - 1].y === snakes[i].y
            ) {
              this.handleStop()
            }
          }

          snakes = JSON.parse(JSON.stringify(this.state.snakes))
          // 替换首尾 === 移动
          snakes.shift()
          snakes.push({
            x: snakes[snakes.length - 1].x,
            y: snakes[snakes.length - 1].y - 1,
            color: 'red'
          })
          this.setState(
            () => ({
              snakes
            }),
            () => {
              this.isGetFood()
              // 撞墙 游戏结束
              if (this.state.snakes[this.state.snakes.length - 1].y < 0) {
                this.handleStop()
              }
            }
          )
        }, this.state.speed)
        break

      // 右
      case 39:
        clearInterval(this.time_left)
        clearInterval(this.time_right)
        clearInterval(this.time_top)
        clearInterval(this.time_down)
        this.time_right = setInterval(() => {
          // 吃到自己 游戏结束
          for (let i = 0; i < snakes.length - 1; i++) {
            if (
              snakes[snakes.length - 1].x === snakes[i].x &&
              snakes[snakes.length - 1].y === snakes[i].y
            ) {
              this.handleStop()
            }
          }

          snakes = JSON.parse(JSON.stringify(this.state.snakes))
          // 替换首尾 === 移动
          snakes.shift()
          snakes.push({
            x: snakes[snakes.length - 1].x + 1,
            y: snakes[snakes.length - 1].y,
            color: 'red'
          })
          this.setState(
            () => ({
              snakes
            }),
            () => {
              this.isGetFood()
              // 撞墙 游戏结束
              if (this.state.snakes[this.state.snakes.length - 1].x > 39) {
                this.handleStop()
              }
            }
          )
        }, this.state.speed)
        break

      // 下
      case 40:
        clearInterval(this.time_left)
        clearInterval(this.time_right)
        clearInterval(this.time_top)
        clearInterval(this.time_down)
        this.time_down = setInterval(() => {
          // 吃到自己 游戏结束
          for (let i = 0; i < snakes.length - 1; i++) {
            if (
              snakes[snakes.length - 1].x === snakes[i].x &&
              snakes[snakes.length - 1].y === snakes[i].y
            ) {
              this.handleStop()
            }
          }

          snakes = JSON.parse(JSON.stringify(this.state.snakes))
          // 替换首尾 === 移动
          snakes.shift()
          snakes.push({
            x: snakes[snakes.length - 1].x,
            y: snakes[snakes.length - 1].y + 1,
            color: 'red'
          })
          this.setState(
            () => ({
              snakes
            }),
            () => {
              this.isGetFood()
              // 撞墙 游戏结束
              if (this.state.snakes[this.state.snakes.length - 1].y > 39) {
                this.handleStop()
              }
            }
          )
        }, this.state.speed)
        break

      default:
        break
    }
  }

  // 判断蛇是否有吃到食物
  isGetFood = () => {
    let { snakes, food } = this.state
    if (
      snakes[snakes.length - 1].x === food[0].x &&
      snakes[snakes.length - 1].y === food[0].y
    ) {
      let newSnakes = JSON.parse(JSON.stringify(snakes))
      let newFood = JSON.parse(JSON.stringify(food))
      // 将食物添加到蛇移动的尾部
      newSnakes.unshift({
        x: newSnakes[0].x,
        y: newSnakes[0].y,
        color: 'red'
      })

      // 去掉被吃掉的食物, 产生新的食物
      newFood.pop()
      newFood.push({
        x: Math.floor(Math.random() * 40),
        y: Math.floor(Math.random() * 40),
        color: `#${Math.floor(Math.random() * 1000000)}`
      })

      this.setState({
        snakes: newSnakes,
        food: newFood
      })
    }
  }

  // 结束游戏
  handleStop() {
    alert('GAME OVER')
    clearInterval(this.time_left)
    clearInterval(this.time_right)
    clearInterval(this.time_top)
    clearInterval(this.time_down)
    document.removeEventListener('keydown', this.onKeyDown)
  }

  render() {
    let { snakes, food } = this.state
    return (
      <Fragment>
        <div>
          <button onClick={this.handleMoving.bind(this)}>开始</button>
          <button style={{ marginLeft: '10px' }} onClick={this.handleStop}>
            结束
          </button>

          <button
            style={{ marginLeft: '10px', backgroundColor: 'green' }}
            onClick={() => {
              this.setState({ speed: 300 })
            }}
          >
            简单
          </button>
          <button
            style={{ margin: '0 10px 0 10px', backgroundColor: 'orange' }}
            onClick={() => {
              this.setState({ speed: 200 })
            }}
          >
            中等
          </button>
          <button
            style={{ backgroundColor: 'red' }}
            onClick={() => {
              this.setState({ speed: 100 })
            }}
          >
            困难
          </button>
          <button
            style={{
              marginLeft: '10px',
              backgroundColor: 'purple',
              color: '#fff'
            }}
            onClick={() => {
              this.setState({ speed: 50 })
            }}
          >
            极难
          </button>
          <button
            style={{
              marginLeft: '10px',
              backgroundColor: '#000',
              color: '#fff'
            }}
            onClick={() => {
              this.setState({ speed: 20 })
            }}
          >
            惨绝人寰
          </button>
        </div>

        <div className="game-area">
          <div className="snake-area">
            {/* 蛇 */}
            <div className="snake">
              {snakes.map((item, index) => {
                return (
                  <div
                    data-key={index + 1}
                    key={index}
                    className="snake-body"
                    style={{
                      backgroundColor: item.color,
                      left: item.x * 20 + 'px',
                      top: item.y * 20 + 'px'
                    }}
                  />
                )
              })}
            </div>
            {/* 食物 */}
            {food.map((item, index) => {
              return (
                <div
                  className="food"
                  key={index}
                  style={{
                    backgroundColor: item.color,
                    left: item.x * 20 + 'px',
                    top: item.y * 20 + 'px'
                  }}
                />
              )
            })}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default RetroSnaker
