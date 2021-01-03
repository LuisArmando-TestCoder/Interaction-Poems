type ComponentNames = { [index: string]: string }

function getComponentNames(breaklinedComponentNames: string) {
    const componentNames: ComponentNames = {}
    const parsedBreaklinedComponentNames: string[] = breaklinedComponentNames.trim().split('\n')

    parsedBreaklinedComponentNames.forEach(componentName => {
        componentNames[componentName] = componentName
    })

    return componentNames
}

const componentNames: ComponentNames = getComponentNames`
DefaultObjects
SimpleLightSet
SimpleCube
SimpleFloor
`

export default componentNames