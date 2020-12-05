Object3D {
    vertexShader
    fragmentShader
    uniforms
    texturesPath
    shape
    color
    radius
    side
    mesh
    physicalBodyType
    transform {
        position { x y z }
        scale { x y z }
        rotation { x y z }
    }
    physics {
        ...props
    }
    model {
        path
        type
    }
    light {
        transform,
        getLight(light, onCondition?)
    }
    getAnimations(animations, onCondition?)
    setCameraController(camera, onCondition?)
    setAnimation(animation, {
        speed
        delay
    }?, onCondition?)
}
addObject3D(objectName, Object3D)
getObject3D(objectName)
addObject3DGroup(groupName, object3DGroup)
getObject3DGroup(groupName)
getScene(scene)
getCamera(camera)
defaultObject3DGroup {
    ...object3DGroup
}