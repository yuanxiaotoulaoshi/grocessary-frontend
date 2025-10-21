
import TabBarUI from './TabBarUI';
import { useTabBar } from 'components/GlossaryList/TabBar/useTabBar';
type TabBarContainerProps = {
    fetchUrl?:string;
    initialLevel1?:number;
    initialLevel2?:number;
    activeClass?:string;
    inactiveClass?:string;
    tabClass?:string;
}
export default function TabBarContainer(props: TabBarContainerProps){
    const { level1Tabs, level2Tabs, activeLevel1, activeLevel2, setLevel1, setLevel2 } =
    useTabBar(props.fetchUrl, props.initialLevel1, props.initialLevel2);

    return (
        <TabBarUI
            level1Tabs={level1Tabs}
            level2Tabs={level2Tabs}
            activeLevel1={activeLevel1}
            activeLevel2={activeLevel2}
            onLevel1Change={setLevel1}
            onLevel2Change={setLevel2}
            activeClass = {props.activeClass}
            inactiveClass={props.inactiveClass}
            tabClass={props.tabClass}
        />
    );
}