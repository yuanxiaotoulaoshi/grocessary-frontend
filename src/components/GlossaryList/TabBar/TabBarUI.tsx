import { Tab, TabGroup, TabList } from '@headlessui/react'
type TabBarUIProps = {
    level1Tabs:string[];
    level2Tabs:string[];
    activeLevel1: number;
    activeLevel2: number;
    onLevel1Change: (index: number) => void;
    onLevel2Change: (index: number) => void;
    activeClass?: string;
    inactiveClass?: string;
    tabClass?: string;
}
export default function TabBarUI({
    level1Tabs,
    level2Tabs,
    activeLevel1,
    activeLevel2,
    onLevel1Change,
    onLevel2Change,
    activeClass = 'bg-theme text-white',
    inactiveClass = 'bg-gray-200 text-gray-700',
    tabClass = 'px-4 py-2 rounded',
}:TabBarUIProps) {
    return (
        <div className="w-full max-w-full mx-auto px-4 py-8">
            {/* 一级分类 Tabs  */}
            <TabGroup selectedIndex={activeLevel1} onChange={onLevel1Change}>
                <TabList className="flex space-x-2 mb-4">
                    {level1Tabs.map((label) => (
                        <Tab
                            key={label}
                            className={
                                ({ selected }) =>`${tabClass} ${selected ? activeClass : inactiveClass}`
                            }
                        >
                            {label}
                        </Tab>
                    ))}
                </TabList>
            </TabGroup>

            {/* 二级分类 */}
            <TabGroup selectedIndex={activeLevel2} onChange={onLevel2Change}>
                <TabList className="flex flex-wrap gap-x-2 gap-y-2 mb-4">
                    {level2Tabs.map((label:any,i) => {
                        const selected = i === activeLevel2;
                        return (
                            <Tab
                                key={label}
                                className={`${tabClass} ${i === activeLevel2 ? activeClass : inactiveClass}`}
                            >
                                {label}
                            </Tab>
                        );
                    })}
                </TabList>
            </TabGroup>
        </div>
    );
}
