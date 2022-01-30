import styles from './Slider.module.scss';

const Slider = ({ ...args }) => <input type={'range'} className={styles.sliderRoot} {...args} />;

export default Slider;
