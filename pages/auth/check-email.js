import React from 'react'
import Router from 'next/router'
import Page from '../../components/page'
import Layout from '../../components/layout'
import { NextAuth } from 'next-auth-client'

export default class extends Page {

  static async getInitialProps({req, res, query}) {
    const session = await NextAuth.init({force: true, req: req})
    
    // If signed in already, instead of displaying message send to callback page
    // which should redirect them to whatever page it normally sends clients to
    if (session.user) {
      if (req) {
        res.redirect('/auth/callback')
      } else {
        Router.push('/auth/callback')
      }
    }
      
    return {
      session: session,
      providers: await NextAuth.providers({req}),      
      email: query.email
    }
  }
  
  render() {
    return (
      <Layout {...this.props} navmenu={false}>
        <div className="text-center pt-5 pb-5">
          <h1 className="display-4">Check your email</h1>
          <p className="lead">
            A sign in link has been sent to <span className="font-weight-bold">{this.props.email}</span>
          </p>
        </div>
      </Layout>
    )
  }
}
