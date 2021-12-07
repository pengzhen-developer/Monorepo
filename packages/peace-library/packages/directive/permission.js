const isSuperAdmin = async () => {
  const userInfo = await Peace.identity.auth.getAccountInfo()

  if (userInfo?.username === 'admin') {
    return true
  }
}

const checkPermission = async (el, binding) => {
  if (await isSuperAdmin()) {
    return true
  } else {
    const routeElementCodes = Peace?.$route?.meta?.menuElements?.map((item) => item?.elementCode) ?? []
    const currentElementCode = binding.value

    return routeElementCodes.includes(currentElementCode)
  }
}

export default {
  name: 'permission',

  inserted: async function(el, binding) {
    if (!(await checkPermission(el, binding))) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  },

  update: async function(el, binding) {
    if (!(await checkPermission(el, binding))) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
